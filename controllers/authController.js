import catchAsync from "../utils/catchAsync.js";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import 'dotenv/config'
import AppError from "../utils/appError.js";
import bcrypt from 'bcrypt'
import {promisify} from 'util'

const signToken=id=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE}
    );
};

const createAndSendToken=(user,statusCode,res)=>{
    const token=(signToken(user._id));
    const cookieOptions={
        expires:new Date(
            Date.now()+
            process.env.JWT_COOKIE_EXPIRES_IN*
            24*60*60*1000
        ),
        secure:false,
        httpOnly:true
    }
    res.cookie('jwt',token,cookieOptions);
    user.password=undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

const signUp=catchAsync(async(req,res,next)=>{
    const newUser=await User.create(req.body);
    newUser.password=await bcrypt.hash(
        newUser.password,10
    )
    await newUser.save();
    createAndSendToken(newUser,201,res);
})

const logIn=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new AppError(
            'please enter email and password',400
        ))
    }
    const user=await User.findOne({email})
    .select('+password');
    if(!user)return next(new AppError(
        'Incorrect email or password',401
    ));
    const correct=await bcrypt.compare(
        password,user.password
    )
    if(!correct)return next(new AppError(
        'Incorrect email or password',401
    ));

    createAndSendToken(user,200,res);

})

const protect =catchAsync(async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return next(new AppError(
            "you aren't loggend in",401)
        );
    }

    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const currentUser=await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError(
            "user of this token don't exist",401
        ))
    }
    req.user=currentUser;
    next();
})

const allowed=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError(
                "you don't have permission",403
            ))
        }
        next();
    }
}

export default{
    signUp,
    logIn,
    protect,
    allowed
}
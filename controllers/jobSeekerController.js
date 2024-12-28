import Application from '../models/applicationModel.js'
import User from '../models/userModel.js'
import Job from '../models/jobModel.js'
import factory from './factoryController.js'
import catchAsync from '../utils/catchAsync.js';
import bcrypt from 'bcrypt'

const getAllJobs=factory.getAllDocs(Job);
const getJob=factory.getDoc(Job);
const createApplication=factory.createDoc(Application);
    

const getMe=catchAsync(async(req,res)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
})

const updateMe=catchAsync(async(req,res,next)=>{
    if(req.body.role){
        req.body.role=req.user.role;
    }
    if(req.body.password){
        req.body.password=await bcrypt.hash(
            req.body.password,10       
        );
    };
    
    const user=await User.findByIdAndUpdate(
        req.user.id,req.body,
        {new:true,runValidators:true}
    );

    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
})

export default{
    getAllJobs,
    getJob,
    createApplication,
    getMe,
    updateMe
}
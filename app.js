import morgan from 'morgan';
import express from 'express'
import adminRoutes from './routes/adminRoute.js'
import jobRoutes from './routes/jobSeekerRoute.js'
import employerRoutes from './routes/employerRoute.js'
import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'
import authController from './controllers/authController.js';
import rateLimit from 'express-rate-limit';

const app=express();
const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many requests,try again in an hour'
});


app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

app.post('/signup',authController.signUp);
app.post('/login',authController.logIn);

app.use('/',employerRoutes)
app.use('/',adminRoutes)
app.use('/',jobRoutes)


app.use('*',(req,res,next)=>{
    next(new AppError(
        "can't find this url",404
    ))
})

app.use(globalErrorHandler);

export default app
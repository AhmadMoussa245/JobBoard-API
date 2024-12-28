import mongoose from "mongoose";

const ApplicationSchema=mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'job id required'],
        ref:'Job'
    },
    applicantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'applicant id required'],
        ref:'User'
    },
    resume:{
        type:String,
        required:[true,"resume required"]
    },
    applicationStatus:String
})

const Application=mongoose.model('Application',ApplicationSchema)

export default Application
import mongoose from "mongoose";

const JobsSchema=mongoose.Schema({
    jobTitle:{
        type:String,
        required:[true,'job must have a title']
    },
    description:{
        type:String,
        required:[true,'job must have a description']
    },
    employer:{
        type:String,
        required:[true,"job must have and employer"]
    },
    location:{
        type:String,
        required:[true,'job must have a location']
    },
    salaryRange:{
        type:String,
        required:[true,'job must have a salary range']
    },
    category:String,
    status:String
})

const Jobs=mongoose.model('Jobs',JobsSchema)

export default Jobs
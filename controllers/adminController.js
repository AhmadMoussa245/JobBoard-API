import User from "../models/userModel.js";
import factory from './factoryController.js'

const getMetrics=async(req,res)=>{
    //waiting to be written
}


const getAllUsers=factory.getAllDocs(User);

const deleteUser=factory.deleteDoc(User);


export default{
    getMetrics,
    getAllUsers,
    deleteUser
}
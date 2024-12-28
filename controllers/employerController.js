import Application from '../models/applicationModel.js'
import Job from '../models/jobModel.js'
import catchAsync from '../utils/catchAsync.js';
import factory from './factoryController.js'


const createJob=factory.createDoc(Job);
const updateJob=factory.updateDoc(Job);
const deleteJob=factory.deleteDoc(Job);

const getApplicationForJob=
        factory.getAllDocs(Application);


export default{
    createJob,
    updateJob,
    deleteJob,
    getApplicationForJob
}
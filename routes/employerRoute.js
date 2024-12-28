import express from 'express'
import employerController from '../controllers/employerController.js'
import authController from '../controllers/authController.js'
const router=express.Router({mergeParams:true})

router.use(authController.protect);

router.route('/')
.post(
    authController.allowed('employer'),
    employerController.createJob
).get(
    authController.allowed('employer'),
    employerController.getApplicationForJob
)

router.route('/:id')
.put(
    authController.allowed('employer'),
    employerController.updateJob
)
.delete(
    authController.allowed('employer'),
    employerController.deleteJob
) 


export default router
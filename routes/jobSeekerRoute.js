import express from 'express'
import jobSeekerController from '../controllers/jobSeekerController.js'
import authController from '../controllers/authController.js'
import employerRouter from '../routes/employerRoute.js'
import upload from '../utils/multer.js'

;
const router=express.Router()


router.use(authController.protect);
router.use('/jobs/:id/applications',employerRouter);

router.get('/jobs',
    jobSeekerController.getAllJobs
)

router.get('/jobs/:id',
    jobSeekerController.getJob
)

router.post('/applications',
    authController.allowed('jobSeeker'),
    upload.single('resume'),
    jobSeekerController.createApplication
)

router.route('/profile')
.get(
    jobSeekerController.getMe
)
.put(
    jobSeekerController.updateMe
)

export default router
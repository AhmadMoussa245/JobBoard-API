import express from 'express'
import adminController from '../controllers/adminController.js'
import authController from '../controllers/authController.js'

const router=express.Router()

router.use(authController.protect);
router.get('/analytics',
    authController.allowed('admin'),
    adminController.getMetrics
)

router.get('/users',
    authController.allowed('admin'),
    adminController.getAllUsers
)

router.delete('/users/:id',
    authController.allowed('admin'),
    adminController.deleteUser
)

export default router
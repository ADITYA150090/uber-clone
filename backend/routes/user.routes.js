const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/register', [
        body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
        body('fullname.lastname')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),
        body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
        body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    ],
    userController.registerUser
);


// ✅ Add login route
router.post(
    '/login', [
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('password').exists().withMessage('Password is required'),
    ],
    userController.loginUser
);


router.get('/profile',
    authMiddleware.authUser, userController.getUserProfile);
router.get('/logout',
    authMiddleware.authUser, userController.logoutUser);

module.exports = router;
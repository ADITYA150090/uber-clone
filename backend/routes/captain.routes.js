const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Captain = require('../models/captain.model'); // adjust path if needed
const captainController = require('../controllers/captain.controller');
// 🧠 POST /api/captains/register
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

        body('vehicle.color')
        .notEmpty()
        .withMessage('Vehicle color is required'),

        body('vehicle.plate')
        .notEmpty()
        .withMessage('Vehicle plate is required'),

        body('vehicle.capacity')
        .isInt({ min: 1 })
        .withMessage('Vehicle capacity must be at least 1'),

        body('vehicle.vehicleType')
        .isIn(['bike', 'car', 'van', 'truck'])
        .withMessage('Invalid vehicle type'),
    ],
    captainController.registerCaptain
)

module.exports = router;
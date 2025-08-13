
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// // attempting to add validation
const { body, validationResults } = require('express-validator');
const User = require('./models/user'); //possible adjust path?

router.post(
    '/register',
    [
        body('fname').notEmpty().withMessage('First name is required'),
        body('lname').notEmpty().withMessage('Last name is required'),
        body('uname').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters') // REMEMBER TO CHANGE THIS IF IT WORKS
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    registerUser
);
/////////////////////////////////////////////


// router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;

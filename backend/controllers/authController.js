
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { fname, lname, uname, email, password } = req.body;
    try {
        const userExists = await User.findOne({ uname });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ fname, lname, uname, email, password });
        res.status(201).json({
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            uname: user.uname,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                uname: user.uname,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            fname: user.fname,
            lname: user.lname,
            uname: user.uname,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { fname, lname, uname, email } = req.body;
        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.uname = uname || user.uname;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.json({
            id: updatedUser.id,
            fname: updatedUser.fname,
            lname: updatedUser.lname,
            uname: updatedUser.uname,
            email: updatedUser.email,
            token: generateToken(updatedUser.id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUserProfile, getProfile };
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const signup = async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

       const user = await User.create({ name, email, password });
        res.json({ message: "User created successfully", user });
    }
    catch (error) {
        res.json({
            errors: error.message
        })

        
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user || user.password !== password) {
            return res.status(400).json({
                 message: 'Invalid email or password'
                });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({
             errors: error.message 
            });
    }
}
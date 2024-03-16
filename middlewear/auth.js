import { checkuser } from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch hashed password from the database
        const hashedPassword = await checkuser(email);

        // Compare passwords using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        
        if (passwordMatch) {
            // Generate JWT token
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1d' });

            // Set token as a cookie (httpOnly: true for security)
            res.cookie('jwt', token, { httpOnly: true });
            
            // Send success response
            return res.json({
                token: token,
                msg: 'You have logged in successfully'
            });
        } else {
            // Send failure response if passwords don't match
            return res.status(401).json({
                msg: 'Invalid email or password'
            });
        }
    } catch (error) {
        // Handle any errors
        console.error('Error during login:', error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

export default loginUser
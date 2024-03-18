import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check,getUserByEmail } from '../models/users.js';

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch hashed password and user ID from the database
        const { id, hashedPassword } = await check(email);

        // Compare passwords using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        let user = await getUserByEmail(email)

        if (passwordMatch) {
            // Generate JWT token with user ID
            const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '1d' });

            // Set token as a cookie (httpOnly: true for security)
            res.cookie('jwt', token, { httpOnly: true });
            
            // Send success response
            return res.json({
                user:user,
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

export default loginUser;

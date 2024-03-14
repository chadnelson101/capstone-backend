import {checkuser} from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email);

        const hashedPassword = await checkuser(email);
        console.log(hashedPassword);
        bcrypt.compare(password, hashedPassword, (err, result) => {
            console.log(result);
            if (err) throw err;
            if (result === true) {
                console.log(email);
                const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '3m' });
                console.log(token);
                res.send({
                    token: token,
                    msg: 'You have logged in successfully'
                });
            } else {
                res.send({
                    msg: 'Invalid email or password'
                });
            }
        });
    } catch (error) {
        console.error('Invalid email or password:', error);
        res.status(404).send('Invalid email or password');
    }
};

export default loginUser;
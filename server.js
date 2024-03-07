import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import logInUser from './middlewear/auth.js'
import cookieParser from 'cookie-parser';
config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/login',logInUser,loginRouter);


app.listen(PORT, ()=>{
    console.log(`http://localhost:`+PORT);
});

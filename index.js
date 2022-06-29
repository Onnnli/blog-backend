import express from 'express';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import {registrationValidator} from './validations/auth.js'
import expressValidator from "express-validator";

const {validationResult} = expressValidator;

mongoose
    .connect('mongodb+srv://admin:Huynuy98@cluster0.vkngu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR',err.message))

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world!!!!');
});


app.post('/login', (req, res) => {
    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Liza'
    }, 'secretKey')


    res.json({
        success: true,
        token,
    })
})

app.post('/registration', registrationValidator,  (req, res) => {   
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.send(400).json(errors.array())
    }

    res.json({
        success: true,
    })
})

app.listen(3000, (error) => {
    if (error) {
        console.log(error)
    }

    console.log('Server start on port')
})
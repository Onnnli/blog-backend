import express from 'express';
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import { registrationValidator } from './validations/auth';
import UserModel from './models/User';

const { validationResult } = expressValidator;

mongoose
  .connect(
    'mongodb+srv://admin:Huynuy98@cluster0.vkngu.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err.message));

const app = express();

app.use(express.json());

// app.post('/login', (req, res) => {})

app.post('/registration', registrationValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(errors.array()).status(400);
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    return res.json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }

  console.log('Server start on port');
});

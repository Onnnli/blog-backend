import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import { registrationValidator } from './validations/auth.js';
import UserModel from './models/User.js';
import checkAuth from './utils/checkAuth.js';

const { validationResult } = expressValidator;

mongoose
  .connect(
    'mongodb+srv://admin:Huynuy98@cluster0.vkngu.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err.message));

const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: `Invalid email or password`,
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: `Invalid email or password`,
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey',
      {
        expiresIn: '30d',
      }
    );

    const userDoc = user._doc;
    delete userDoc.passwordHash;

    return res.json({ ...userDoc, token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
});

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

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKey',
      {
        expiresIn: '30d',
      }
    );

    const userDoc = user._doc;
    delete userDoc.passwordHash;

    return res.json({ ...userDoc, token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
});

app.get('/user', checkAuth, async (req, res) => {
  try {
    const user = await UserModel.finsOneById(req.userId);

    if (!user) {
      res.status(404).json({
        message: 'User is not find',
      });
    }

    const userDoc = user._doc;
    delete userDoc.passwordHash;

    return res.json(userDoc);
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

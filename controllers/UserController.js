import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const registration = async (req, res) => {
  try {
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
      process.env.SECRET_KEY,
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
};

export const login = async (req, res) => {
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
      process.env.SECRET_KEY,
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
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      res.status(404).json({
        message: 'User is not found',
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
};

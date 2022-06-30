import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
  loginValidation,
  postCreateValidation,
  registrationValidator,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.post('/login', loginValidation, UserController.login);
app.post('/registration', registrationValidator, UserController.registration);
app.get('/user', checkAuth, UserController.getUser);

app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.get('/posts', checkAuth, PostController.getAllPosts);
app.get('/posts/:id', checkAuth, PostController.getPost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  PostController.updatePost
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err.message));

app.listen(PORT, () => {
  try {
    console.log(`Server start on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import {
  PostController,
  UploadController,
  UserController,
} from './controllers/index.js';
import {
  loginValidation,
  postCreateValidation,
  registrationValidator,
} from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

dotenv.config();

const { PORT } = process.env;

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/registration',
  registrationValidator,
  handleValidationErrors,
  UserController.registration
);
app.get('/user', checkAuth, UserController.getUser);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createPost
);
app.get('/posts', checkAuth, PostController.getAllPosts);
app.get('/posts/tags', PostController.getTags);
app.get('/posts/:id', checkAuth, PostController.getPost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.updatePost
);
app.post(
  '/upload',
  checkAuth,
  upload.single('image'),
  UploadController.uploader
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

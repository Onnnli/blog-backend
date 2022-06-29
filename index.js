import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { registrationValidator } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { login, registration, getUser } from './controllers/UserController.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post('/login', login);
app.post('/registration', registrationValidator, registration);
app.get('/user', checkAuth, getUser);

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

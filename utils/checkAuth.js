import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Authorization error' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Authorization error' });
  }
};

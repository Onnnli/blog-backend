import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = new Comment({
      text: req.body.text,
      post: postId,
      user: req.userId,
    });

    const comments = await doc.save();
    const data = await comments.populate('user');

    return res.json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate('user');

    res.json(comments);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
};

import Comment from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;

    const comment = new Comment({
      text: req.body.text,
      post: postId,
      user: req.userId,
    });

    const comments = await comment.save();
    const data = await comments.populate('user');

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $push: { comments: comment } },
      async (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: `Something went wrong 1!`,
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post is undefined',
          });
        }
      }
    ).populate('user');

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

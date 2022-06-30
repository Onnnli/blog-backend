import PostModel from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Something went wrong!`,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    return PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
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

        return res.json(doc);
      }
    ).populate('user');
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Something went wrong 2!`,
    });
  }
};

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

// eslint-disable-next-line consistent-return
export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
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

// eslint-disable-next-line consistent-return
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: `Something went wrong 2!`,
          });
        }

        if (!doc) {
          return res.status(500).json({
            message: `Something went wrong 2!`,
          });
        }
        return res.json({ message: 'Post was removed' });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Something went wrong 2!`,
    });
  }
};

// eslint-disable-next-line consistent-return
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );

    return res.json({
      message: 'Post was updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Something went wrong 2!`,
    });
  }
};

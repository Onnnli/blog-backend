export const uploader = (req, res) => {
  res.json({
    url: `http://localhost:${process.env.PORT}/uploads/${req.file.originalname}`,
  });
};

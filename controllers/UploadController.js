export const uploader = (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
};

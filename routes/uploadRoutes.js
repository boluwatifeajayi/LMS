const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

// Set up disk storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename for uploaded file
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Function to check if uploaded file is of valid type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|png|jpg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

// Set up multer middleware for handling file uploads
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Handle POST requests to upload an image
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;

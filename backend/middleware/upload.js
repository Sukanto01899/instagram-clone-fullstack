const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using uuid and the original extension
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

// Set up file filter
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Set up multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Export middleware for different file upload types
module.exports = {
  uploadAvatar: upload.single('avatar'),
  uploadPostImage: upload.single('image')
};
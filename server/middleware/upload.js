import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg/;
  const allowedFileTypes = /pdf|jpeg|jpg|png|gif|webp|svg|glb|gltf/;
  if (file.mimetype.match(allowedImageTypes) || file.mimetype.match(allowedFileTypes)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/heic"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-noteImg" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;

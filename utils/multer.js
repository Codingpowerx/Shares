const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

/*
module.exports = multer({
  storgae: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/png||jpeg||jpg||gif||mpeg||ogg||pdf||tiff||webm||wav||zip||aac||mp3$i/)) {
      cb(new Error('File not supported'), false);
      return;
    }

    cb(null, true);
  }
})
*/

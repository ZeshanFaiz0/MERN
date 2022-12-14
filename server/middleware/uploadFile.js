import multer from "multer";
import path  from "path";

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Init Upload
const upload = multer({
  storage: storage,
  // Limit File size
//   limits: { fileSize: 1000000 },
  // File Type Check
  fileFilter: async function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(
file,cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
}
export const uploadFile = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      res.json(err);
    }
     req.body.picturePath = req.file.originalname;
      next();
  });
};


const express = require('express')
const multer  = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
    res.send("Image Uploaded")
  });


module.exports = router;
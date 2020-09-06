const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const getImagesController = require("../controllers/images");
const multer = require("multer");
const upload = multer({});

/* GET home page. */
router.get('/', async function(req, res) {
  let data = await getImagesController.getFile();
  res.render('index', { images: data });
});


router.post("/upload", uploadController.uploadFiles);

router.get("/images", getImagesController.getFile);




module.exports = router;

const upload = require("../middleware/fileUpload");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.files);
    // if (req.files.length < 4 ) {
    //   return res.send(`You must select at least 4 files.`);
    // }
    
    await upload(req, res);
    return res.send(`Files have been uploaded.`);
  } catch (error) {
    console.log(error);
    
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  uploadFiles: uploadFiles
};
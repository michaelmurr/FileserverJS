const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const router = express.Router();

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

// Init Upload
var upload = multer({
  storage: storage,
  limits:{fileSize: 100000000}
}).array('fileUpload', 10);

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.files == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!'
        });
      }
    }
  });
});

module.exports = router;

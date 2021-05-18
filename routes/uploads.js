const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const router = express.Router();
const fs = require("fs");
const { json } = require('body-parser');
const dir = "./uploads";

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, dir);
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

// Init Upload
var upload = multer({
  storage: storage
}).array('fileUpload', 10);



router.post('/upload', (req, res) => {

  let rawData = fs.readFileSync("./files.json");
  let fileData = JSON.parse(rawData);

  upload(req, res, (err) => {
    if(err){

      res.render('index', {
        msg: err, fileData
      });

    } else {

      if(req.files[0] == undefined){
        res.render('index', { msg: 'Error: No File Selected!', fileData});
      } else {

        let uploadedFiles = req.files;

        uploadedFiles.forEach(file => {
          fileData.push({name: file.filename});
          let stringifiedJSON = JSON.stringify(fileData);
          fs.writeFileSync("./files.json", stringifiedJSON);
        });
        res.redirect("/");
      }
    }
  });
});

module.exports = router;

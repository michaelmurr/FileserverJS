const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const router = express.Router();
const fs = require("fs");
const getUploadsPath = require("../getUploadsPath");
const convertDataUnit = require('../convertDataUnit');
const scanDir = require('../scanDir');

const dir = getUploadsPath();
let fileData = scanDir(dir);

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    fileData.forEach(element => {
      if (element.name === file.originalname){
        cb(new Error (file.originalname + " already exists!"));
      }
    });
    cb(null, file.originalname);
  }
});

// Init Upload
var upload = multer({
  storage: storage
}).array('fileUpload');

router.post('/upload', (req, res) => {


  upload(req, res, (err) => {
    if (err) {
      //render error
      res.render('index', { msg: err, fileData });
    } else {

      if (req.files[0] == undefined) {
        res.render('index', { msg: 'Error: No File Selected!', fileData });
      } else {

        req.files.forEach(file => {
          
          fileData.push({
            name: file.filename,
            fileSize: convertDataUnit(dir, file.filename)
          });
        });

        res.render("index", { msg: "Upload successful!", fileData });
      }
    }
  });
});

module.exports = router;

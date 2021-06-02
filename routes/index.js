const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const scanDir = require('../scanDir');
const getUploadsPath = require("../getUploadsPath");

const dir = getUploadsPath();

router.get('/', function(req, res, next) {

  //read gets JSON object that holds properties of files and 
  //renders it on page
   let fileData = scanDir(dir);
   
   res.render('index', {msg: "FileServerJS", fileData});
  });

module.exports = router;

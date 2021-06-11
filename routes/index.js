const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const scanDir = require('../scanDir');
const getUploadsPath = require("../getUploadsPath");
const getDiskSpace = require('../getDiskSpace');

const dir = getUploadsPath();

router.get('/', function(req, res, next) {

  //read gets JSON object that holds properties of files and 
  //renders it on page
   let fileData = scanDir(dir);
   let diskStats = getDiskSpace();
   let stringifiedStats = JSON.stringify(diskStats);
   
   res.render('index', {msg: "FileServerJS", fileData, diskStats: stringifiedStats});
  });

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res, next) {

  //read JSON that holds properties of files and 
  //renders it on page
   let rawData = fs.readFileSync("./files.json");
   let fileData = JSON.parse(rawData);
   
   res.render('index', {msg: "FileServerJS", fileData});
  });

module.exports = router;

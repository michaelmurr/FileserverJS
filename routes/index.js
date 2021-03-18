const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello World</h2>');

router.get('/', function(req, res, next) {
  //const directoryPath = path.dirname('/mike/home/Documents/Coding/PersonalFileserver/uploads');
  let filesInFolder = new Array();
  
  //passsing directoryPath and callback function
  fs.readdir("uploads", function (err, files) {
    let i = 0;
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 

    console.log(files);
    res.render('index', {msg: "E", files: files});
  });
});

module.exports = router;

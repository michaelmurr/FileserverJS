const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

let dir = "./uploads";

router.get('/', function(req, res, next) {
  //const directoryPath = path.dirname('/mike/home/Documents/Coding/PersonalFileserver/uploads');
  
  //passsing directoryPath and callback function
  fs.readdir("uploads", function (err, files) {

    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      res.render('index');
    }
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 

    //console.log(files);
    res.render('index', {msg: "E", files: files});
  });
});

module.exports = router;

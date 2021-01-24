let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

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

var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var Path = '/home/mike/Documents/Coding/NodeJS/PersonalFileserver/uploadedFiles/yeet.jpg';
var fs = require('fs');
var fileUpload = require('express-fileupload');

router.get('/', function(req, res, next) {
  res.render('index');
});


/*
router.post('/upload', function(req, res, next){

  /*
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    console.log(req);
    var oldpath = files.filetoupload.path;
    var newpath = '/home/mike/Documents/Coding/NodeJS/PersonalFileserver/uploadedFiles';
    fs.rename(oldpath, newpath, function(err){
      if(err) throw err;
      console.log('File uploaded and moved!');
    });
    res.redirect('../');
    res.end();
  });
//////////////////
  if(!req.files || Object.keys(req.files).length === 0){
    //res.redirect('../');
    return res.status(400).send('No files were uploaded.')
  }

  let filetoupload = req.files.filetoupload;

  filetoupload.mv("/home/mike/Desktop/" + files.filetoupload.Path, function(err){
    if(err)
      return res.status(500).send(JSON.stringify(err));

    res.send('File uploaded!');
    res.redirect('..');
  });
});
*/

module.exports = router;

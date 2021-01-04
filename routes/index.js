var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var Path = '/home/mike/Documents/Coding/NodeJS/PersonalFileserver/uploadedFiles/yeet.jpg';
var fs = require('fs');
var fileUpload = require('express-fileupload');

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

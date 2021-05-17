const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
let dir = "./uploads";

router.get('/', function(req, res, next) {

   let rawData = fs.readFileSync("./files.json");
   let fileData = JSON.parse(rawData);
  
   console.log(fileData + " from GET /");
    //console.log(files);
    res.render('index', {msg: "Hallo", fileData});

  });


module.exports = router;

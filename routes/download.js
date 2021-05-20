var express = require('express');
var router = express.Router();
const zip = require("express-zip");
const getUploadsPath = require("../getUploadsPath");

const dir = getUploadsPath();

router.post('/download', function(req, res, next) {
    let keys = Object.keys(req.body);
    console.log(dir + "/");
    let downloadFileArray = keys.map((file,index) => {
        return {
            path: dir + "/" + file,
            name: file
        }
    });
    //console.log(JSON.stringify(downloadFileArray, undefined, 4));
    console.log(downloadFileArray[0]);
    if(downloadFileArray[0] != undefined ){
        res.zip(downloadFileArray);

    }else{
        res.redirect("/");
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
const zip = require("express-zip");
const getUploadsPath = require("../getUploadsPath");
const scanDir = require('../scanDir');
const getDiskSpace = require("../getDiskSpace");

const dir = getUploadsPath();

router.post('/download', function(req, res) {
    let fileData = scanDir(dir);
   let diskStats = getDiskSpace();
   let stringifiedStats = JSON.stringify(diskStats);

    console.log("Download request recieved!");
    let keys = Object.keys(req.body);
    if(keys.length > 0){

        let downloadFileArray = keys.map((file) => {
            return {
                path: dir + "/" + file,
                name: file
            }
        });

        if(downloadFileArray[0] != undefined ){
        res.zip(downloadFileArray);
        }
    }else{
        console.log("Download: No files selected!");
        res.render("index", {msg: "No files selected!", fileData, diskStats: stringifiedStats});
    }
});

module.exports = router;
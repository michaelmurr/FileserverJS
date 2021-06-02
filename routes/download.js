var express = require('express');
var router = express.Router();
const zip = require("express-zip");
const getUploadsPath = require("../getUploadsPath");
const scanDir = require('../scanDir');

const dir = getUploadsPath();

let fileData = scanDir(dir);

router.post('/download', function(req, res) {
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
            res.render("index", {msg: "Download starting...", fileData})
        }

    }else{
        console.log("Download: No files selected!");
        res.render("index", {msg: "No files selected!", fileData});
    }
});

module.exports = router;
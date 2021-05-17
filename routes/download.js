var express = require('express');
var router = express.Router();
const zip = require("express-zip");

router.post('/download', function(req, res, next) {
    let keys = Object.keys(req.body);
    let downloadFileArray = keys.map((file,index) => {
        return {
            path: "./uploads/" + file,
            name: file
        }
    });
    //console.log(JSON.stringify(downloadFileArray, undefined, 4));
    console.log(downloadFileArray[0]);
    if(downloadFileArray[0] != undefined ){
        res.zip(downloadFileArray);

    }

});

module.exports = router;
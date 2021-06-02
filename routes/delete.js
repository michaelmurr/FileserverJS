const express = require("express");
const router = express.Router();
const fs = require("fs");
const convertDataUnit = require("../convertDataUnit");
const getUploadsPath = require("../getUploadsPath");

const dir = getUploadsPath();

router.post("/delete", (req, res) => {
    let keys = Object.keys(req.body);

    console.log("Elements that will be removed: \n" + keys);
    //remove selected files
    keys.forEach(key => {
        fs.rm(dir + "/" + key);
        console.log("Removed: " + key);
    });
    let fileData = scanDir(dir);

    res.render("index", {msg: "Files removed!" , fileData});
});

module.exports = router;
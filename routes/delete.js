const express = require("express");
const router = express.Router();
const fs = require("fs");
const getUploadsPath = require("../getUploadsPath");
const scanDir = require("../scanDir");
const getDiskSpace = require("../getDiskSpace");

const dir = getUploadsPath();

router.post("/delete", (req, res) => {
    let keys = Object.keys(req.body);

    console.log("Elements that will be removed: \n" + keys);
    //remove selected files
    keys.forEach(key => {
        fs.rmSync(dir + "/" + key);
        console.log("Removed: " + key);
    });
    let fileData = scanDir(dir);
    let diskStats = getDiskSpace();
    let stringifiedStats = JSON.stringify(diskStats);

    res.render("index", {msg: "Files removed!" , fileData, diskStats: stringifiedStats});
});

module.exports = router;
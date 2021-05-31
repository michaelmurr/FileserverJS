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
        fs.rmSync(dir + "/" + key);
        console.log("Removed: " + key);
    });
    let files = fs.readdirSync(dir).map((file, index) => {
    
        return {
            name: file,
            fileSize: convertDataUnit(dir, file)
        }
    });
    const output = JSON.stringify(files, undefined, 4)
    fs.writeFileSync('./files.json', output);
    
    res.redirect("/");
});

module.exports = router;
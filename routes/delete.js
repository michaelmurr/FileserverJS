const express = require("express");
const router = express.Router();
const fs = require("fs");
const getUploadsPath = require("../getUploadsPath");

const dir = getUploadsPath();

router.post("/delete", (req, res) => {
    let keys = Object.keys(req.body);
    //remove selected files
    keys.forEach(key => {
        fs.rmSync(dir + "/" + key);
        console.log("Removed: " + key);
    });
    let files = fs.readdirSync(dir).map((file, index) => {
        return {
            name: file
        }
    });
    const output = JSON.stringify(files, undefined, 4)
    fs.writeFileSync('./files.json', output);
    //res.render("index", {msg: "File(s) deleted!", files});
    res.redirect("/");
});

module.exports = router;
const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/delete", (req, res) => {
    let keys = Object.keys(req.body);
    keys.forEach(key => {
        fs.rmSync("./uploads/" + key);
        console.log(key);
        
    });
    let files = fs.readdirSync("./uploads").map((file, index) => {
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
const fs = require("fs");
const configPath = (__dirname + "/uploadsConfig.json");

const getUploadsPath = function(){
    let PathObj = JSON.parse(fs.readFileSync(configPath));
    return PathObj.path;
}

module.exports = getUploadsPath;


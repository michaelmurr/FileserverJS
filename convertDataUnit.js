const fs = require("fs");

//takes a directory and a filename and returns it's size
//rounded to 1 decimal with either "B", "KB", "MB" or "GB" as a postfix
const convertDataUnit = function(dir, fileName){
    let stats= fs.statSync(dir + "/" + fileName);

    console.log("Size: " + stats.size + " Bytes");
    
    if(stats.size / 1000000000 > 1){
      return (stats.size / 1000000000).toFixed(1) + " GB";
    }else if(stats.size / 1000000 > 1){
      return (stats.size / 1000000).toFixed(1) + " MB";
    }else if(stats.size / 1000 > 1){
      return (stats.size / 1000).toFixed(1) + " KB";
    }else{
      return stats.size + " B";
    }
}

module.exports = convertDataUnit;
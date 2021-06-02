const express = require("express");
const fs = require("fs");
const convertDataUnit = require("./convertDataUnit");

//returns all files in specified directory with 
//their size as a json object

const scanDir = function(dir){
    const files = fs.readdirSync(dir).map((file) => {
        return{
            name: file,
            filesize: convertDataUnit(dir, file)
        }
    });
    return files;
}

module.exports = scanDir;
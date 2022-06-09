import fs from "fs";
import path from "path";
import multer from "multer";
import express from "express";
import zip from "express-zip";
import prettyBytes from "pretty-bytes";

import File from "../models/fileSchema.js";
import getUploadsPath from "../getUploadsPath.js";

const router = express.Router();
const dir = getUploadsPath();

//multers docs dont specify what cb means, so i got the following text from stackoverflow
//https://stackoverflow.com/a/59394810

// "This callback is a so called error-first function, thus when examining the req, or file you
// may decide, that user uploaded something wrong, pass new Error() as first argument, and it
// will be returned in response. Note though, that it will raise an unhandled exception in your
// app. So I prefer to always pass null and handle user input in the corresponding controller.""

//note: cb probably stands for "callback"

//setting up multer
const storage = multer.diskStorage({
  destination: dir,
  filename: function (req, file, cb) {
    if (fs.existsSync(path.join(dir, file.originalname))) {
      cb(new Error(file.originalname + " already exists!"));
    } else {
      cb(null, file.originalname);
      console.log(dir);
    }
  },
});
const upload = multer({ storage: storage }).array("fileUpload");

//Handling the Fileupload
//
router.post("/upload", async (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send({ message: err.message });
    if (req.files[0] === undefined)
      return res.status(400).send({ message: "No Files Selected!" });

    req.files.forEach((element) => {
      try {
        const file = new File({
          fileName: element.filename,
          fileSize: prettyBytes(fs.statSync(dir + "/" + element.filename).size),
        });

        file.save();
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
      }
    });

    return res.status(200).send({ message: "Worked" });
  });
});

//Handle deletion
//
router.post("/delete", (req, res) => {
  let keys = Object.keys(req.body);

  console.log("Elements that will be removed: \n" + keys);
  //remove selected files
  keys.forEach((key) => {
    fs.rmSync(dir + "/" + key);
    File.findOneAndDelete({ fileName: key });
    console.log("Removed: " + key);
  });
  res.status(200).send({ message: "Sucess!" });
});

//Handle Download
//
router.post("/download", function (req, res) {
  console.log("Download request recieved!");

  let keys = Object.keys(req.body);
  if (keys.length > 0) {
    let downloadFileArray = keys.map((file) => {
      return {
        path: dir + "/" + file,
        name: file,
      };
    });

    if (downloadFileArray[0] != undefined) {
      res.zip(downloadFileArray);
    }
  } else {
    console.log("Download: No files selected!");
    res.send({ message: "No files selected!" });
  }
});

export default router;

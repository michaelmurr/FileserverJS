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

// "This callback is a so called error-first function, thus when examining the req, or item you
// may decide, that user uploaded something wrong, pass new Error() as first argument, and it
// will be returned in response. Note though, that it will raise an unhandled exception in your
// app. So I prefer to always pass null and handle user input in the corresponding controller.""

//note: cb probably stands for "callback"

//setting up multer
const storage = multer.diskStorage({
  destination: dir,
  filename: function (req, item, cb) {
    if (fs.existsSync(path.join(dir, item.originalname))) {
      const filename =
        item.originalname + "_" + Date.now() + path.extname(item.originalname);
      return cb(null, filename);
    }
    cb(null, item.originalname);
  },
});
const upload = multer({ storage }).array("fileUpload"); //fileUpload is the name of the Input Field

//Handling the Fileupload
//
router.post("/upload", async (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send({ message: err.message });
    if (req.files[0] === undefined)
      return res.status(400).send({ message: "No Files Selected!" });

    req.files.forEach((element) => {
      try {
        const item = new File({
          fileName: element.filename,
          fileSize: prettyBytes(fs.statSync(dir + "/" + element.filename).size),
        });

        item.save();
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
      }
    });

    return res.status(200).send({ message: "Worked" });
  });
});

//Handle getting all Files
//
router.get("/files", async (req, res) => {
  const files = await File.find({});
  res.status(200).send(files);
});

//Search for files
//
router.get("/search/:searchClause", async (req, res) => {
  const files = await File.find({
    fileName: { $regex: req.params.searchClause },
  });
  console.log(files);
  res.send(files);
});

//Handle deletion
//
router.delete("/delete", async (req, res) => {
  //remove selected files
  for (const file of req.body.selectedFiles) {
    fs.rmSync(dir + "/" + file);
    const res = await File.deleteOne({ fileName: file });
    console.log("Removed: " + file);
  }
  res.status(200).send({ message: "Sucess!" });
});

//Handle Download
//
router.post("/download", (req, res) => {
  if (req.body.selectedFiles.length === 0)
    return res.status(400).send({ message: "No files selected!" });
  //check if array is empty or undefined

  let downloadFileArray = req.body.selectedFiles.map((item) => {
    return {
      path: dir + "/" + item,
      name: item,
    };
  });
  res.zip(downloadFileArray);
});

export default router;

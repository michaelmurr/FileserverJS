const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.post('/upload-multiple-images', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpwers.imageFilter }).array('multiple_images', 10);

    upload(req, res, (err) => {
        if(req.fileValidationError){
            return res.send(req.fileValidationError);
        }
        else if(!req.file){
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        let result = "You have uploaded these images: <hr />";
        const fles = req.files;
        let index, len;

        //Loop through all the uploaded images and display them on frontend
        for(index = 0, len = files.length; index < len; ++index){
            result += '<img src="${files[index].path}" width="300" style="margin-right: 20px;">';
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);
    });
});

module.exports = router;
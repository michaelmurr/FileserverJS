var express = require('express');
var router = express.Router();
router.get('/download', (req, res, next) => {
    res.download("./uploads/test.txt");
});

module.exports = router;
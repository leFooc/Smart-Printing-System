const express = require("express");
const file = require("../controllers/fileController");
const loadFile = require("../middleware/fileMulter");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.get('/get',
    authToken,
    file.getFiles
);

router.post('/upload',
    authToken,
    loadFile,
    file.uploadFile
);

router.delete('/delete',
    authToken,
    file.deleteFile
);

module.exports = router;
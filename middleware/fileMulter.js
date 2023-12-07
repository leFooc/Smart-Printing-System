const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../fileSystem'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'
        && ext !== '.pdf' && ext !== '.docx'
    ) {
        return cb(new Error('Invalid file'))
    }
    cb(null, true)
};

//.single(fieldname) : Accept a single file with the name fieldname. The single file will be stored in req.file.
const loadFile = multer({
    storage: fileStorage,
    limits: { fileSize: 50 * 1024 * 1024 }, //50MB
    fileFilter: fileFilter
}).single("file");

module.exports = loadFile;
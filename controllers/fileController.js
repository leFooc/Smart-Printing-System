const fileService = require("../services/fileService");

const getFiles = async (req, res, next) => {
    try {
        //res.send("get file from controller");
        const userId = req.userId;
        const list = await fileService.getFiles(userId);
        res.status(200).json({
            message: "get files successfully",
            list: list,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
}

const uploadFile = async (req, res, next) => {
    try {
        //res.send("upload file from controller");
        const userId = req.userId;
        const file = req.file;

        const returnFile = await fileService.createFile(userId, file);
        res.status(200).json({
            message: "upload file successfully",
            file: returnFile
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const deleteFile = async (req, res, next) => {
    try {
        //res.send("delete file from controller");
        const id = parseInt(req.query.id);
        const userId = req.userId;

        if (fileService.validateOwnership(userId, id)) {
            await fileService.unlinkFile(id);
            await fileService.deleteFile(id, userId);
        }
        else {
            const error = new Error("File not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "delete file successfully"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    getFiles,
    uploadFile,
    deleteFile,
};
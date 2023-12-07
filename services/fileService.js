const db = require('../models/index');
const path = require('path');
const fs = require('fs');
const pagecount = require('page-count');
const userService = require('./userService');
require('dotenv').config();

const getFiles = async (userId) => {
    let list = [];
    list = await db.File.findAll({
        raw: true,
        where: {
            userId: userId
        }
    })
    return list;
}

const createFile = async (userId, file) => {
    let originalName = file.originalname;
    let filepath = file.path.replace('\\\\', '/').replace('\\', '/');
    let index = filepath.indexOf('Smart-Printing-System'); //change me to Smart-Pringting-System
    filepath = filepath.substr(index);
    let filetype = path.extname(filepath);

    let data = (file.size / (1024 * 1024)).toFixed(2); //in MB

    let user = await db.User.findOne({
        where: {
            id: userId
        }
    });

    if (data + user.dataUsed > process.env.STUDENTDATA * 1024) {
        const error = new Error("Out of data");
        error.statusCode = 409
        throw error;
    }

    user.dataUsed += data;
    await user.save();

    let returnFile = await db.File.create({
        userId: userId,
        fileName: originalName,
        filePath: filepath,
        fileType: filetype,
        size: data,
        paper: 0
    })

    returnFile.paper = (await countPage(returnFile.id)).page;
    await returnFile.save();
    return returnFile;

}

const validateOwnership = async (userId, fileId) => {
    const file = await db.File.findOne({
        where: {
            id: fileId,
            userId: userId
        }
    })
    return file ? true : false;
}

const deleteFile = async (fileId, userId) => {
    let file = await db.File.findOne({
        where: {
            id: fileId
        }
    });

    let user = await db.User.findOne({
        where: {
            id: userId
        }
    });

    user.dataUsed = user.dataUsed - file.size < 0 ? 0 : user.dataUsed - file.size;
    await user.save();

    await db.File.destroy({
        where: {
            id: fileId
        }
    });
}

const unlinkFile = async (fileId) => {
    const file = await db.File.findOne({
        raw: true,
        where: {
            id: fileId
        }
    });
    if (file) {
        const filePath = path.join(__dirname, '../../', file.filePath);
        //console.log(filePath);
        fs.unlink(filePath, (err) => {
            if (err) throw err;
            //console.log("file deleted!")
        })
    }
}

const countPage = async (id) => {
    if (typeof (id) != 'number') throw error("file not found");
    const file = await db.File.findOne({
        raw: true,
        where: {
            id: id
        }
    });
    let filepath = path.join(__dirname, "../../", file.filePath);
    if (file.fileType == ".docx") {
        const docxBuffer = fs.readFileSync(filepath);
        const pages = await pagecount.DocxCounter.count(docxBuffer);
        return {
            page: pages,
            type: "document"
        }
    }
    else if (file.fileType == ".pdf") {
        const pdfBuffer = fs.readFileSync(filepath);
        const pages = await pagecount.PdfCounter.count(pdfBuffer);
        return {
            page: pages,
            type: "document"
        }
    }
    else if (file.fileType == ".png" || file.fileType == ".jpg" || file.fileType == ".jpeg") {
        return {
            page: 1,
            type: "image"
        }
    }
    else {
        return {
            page: 0,
            type: "none"
        }
    }
}

module.exports = {
    getFiles,
    createFile,
    validateOwnership,
    deleteFile,
    unlinkFile,
    countPage
}
const db = require('../models/index');
const fileService = require('./fileService');
const printerService = require('./printerService');

const createOrder = async (userId, printerId, fileId, copies, side, isPortrait, isA4, properties) => {
    if (! await fileService.validateOwnership(userId, fileId)) {
        const error = new Error("File not found");
        error.statusCode = 404;
        throw error;
    }
    console.log(await printerService.isActive(printerId));
    if (! await printerService.isActive(printerId)) {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }
    let papers = 0;
    if (properties.type == 'document') {
        //A4: 210x297 ; A3: 297x420 A4=0.7A3
        if (!isA4) papers = properties.page * 2;
        else papers = properties.page;
        if (side == 2) paper = Math.ceil(paper / 2);
    }
    else if (properties.type == 'image') {
        if (!isA4) papers = properties.page * 2;
        else papers = properties.page;
    }
    else if (properties.type == 'none') {
        const error = new Error("File type not supported");
        error.statusCode = 400;
        throw error;
    }

    papers = papers * copies;

    let user = await db.User.findByPk(userId);
    if (user.paper - papers < 0) {
        const error = new Error("Not enough paper");
        error.statusCode = 400;
        throw error;
    }
    user.paper -= papers;
    await user.save();

    let file = await db.File.findByPk(fileId);

    let printer = await db.Printer.findByPk(printerId);
    if (printer.Papers - papers < 0) {
        const error = new Error("Printer not enough paper");
        throw error;
    };
    printer.Papers -= papers;
    printer.TaskCount += 1;
    await printer.save();

    let order = await db.Order.create({
        printerId: printerId,
        userId: userId,
        fileId: fileId,
        fileName: file.fileName,
        location: printer.Location,
        copies: copies,
        isPortrait: isPortrait,
        isA4: isA4,
        paperUsed: papers
    });
    await order.save();

    printerService.doTask(printerId);
    //let minute = 1;
    //printerService.doTask(printerId, papers, next);
}

const getListByUser = async (userId) => {
    let list = [];
    list = await db.Order.findAll({
        raw: true,
        include: {
            model: db.User,
            require: true
        },
        where: {
            userId: userId
        }
    });
    list.forEach(order => {
        order.isPortrait = order.isPortrait == '1' ? true : false;
        order.isA4 = order.isA4 == '1' ? true : false;
    });
    return list;
}

const getListByPrinter = async (printerId) => {
    let list = [];
    list = await db.Order.findAll({
        raw: true,
        include: {
            model: db.Printer,
            require: true
        },
        where: {
            printerId: printerId
        }
    });
    list.forEach(order => {
        order.isPortrait = order.isPortrait == '1' ? true : false;
        order.isA4 = order.isA4 == '1' ? true : false;
    });
    return list;
}

module.exports = {
    createOrder,
    getListByUser,
    getListByPrinter
}
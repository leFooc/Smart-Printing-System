const db = require("../models/index");
const { get } = require("../routes/printer");

//Create printer
const createPrinter = async (printerName, printerLocation, printerPapers, printerStatus, printerTasks) => {
    let printer = await db.Printer.create({
        Name: printerName,
        Location: printerLocation,
        Papers: printerPapers,
        ActiveStatus: printerStatus,
        TaskCount: printerTasks
    });
    //console.log("printer is: ", printer);
    await printer.save();
}

//Read printer
const listPrinter = async () => {
    let list = [];
    list = await db.Printer.findAll({ raw: true });
    return list;
}

const getPrinter = async (printerId) => {
    if (typeof (printerId) != 'number') {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }

    let printer = await db.Printer.findByPk(printerId);

    if (!printer) {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }
    return printer;
}

//Update printer
const updatePrinter = async (printerId, printerName, printerLocation) => {
    if (typeof (printerId) != 'number') {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }

    let printer = await db.Printer.findByPk(printerId);

    if (!printer) {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }

    printer.Name = (printer.name == '') ? printer.Name : printerName;
    printer.Location = (printer.location == '') ? printer.Location : printerLocation;
    await printer.save();
}

//Delete printer
const deletePrinter = async (printerId) => {
    if (typeof (printerId) != 'number') {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }

    let printer = await db.Printer.findByPk(printerId);

    if (!printer) {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }

    await printer.destroy();
}

const turnOn = async (printerId) => {
    let printer = await getPrinter(printerId);
    printer.ActiveStatus = true;
    await printer.save();
}

const turnOff = async (printerId) => {
    let printer = await getPrinter(printerId);
    printer.ActiveStatus = false;
    await printer.save();
}

const doTask = async (printerId) => {
    await timeout(1);
    if (typeof (printerId) != 'number') {
        const error = new Error("Printer not found");
        error.statusCode = 404;
        throw error;
    }
    let printer = await db.Printer.findByPk(printerId);
    printer.TaskCount = printer.TaskCount > 0 ? printer.TaskCount - 1 : printer.TaskCount;
    await printer.save();
}

const addPaper = async (printerId, papers) => {
    let printer = await getPrinter(printerId);
    printer.Papers += papers;
    await printer.save();
}

const isActive = async (printerId) => {
    let printer = await getPrinter(printerId);
    return printer.ActiveStatus;
}

const timeout = (minute) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * 60 * minute));
}

module.exports = {
    createPrinter,
    listPrinter,
    getPrinter,
    updatePrinter,
    deletePrinter,
    turnOn,
    turnOff,
    isActive,
    doTask,
    addPaper,
}
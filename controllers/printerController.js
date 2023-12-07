const printerService = require("../services/printerService");

const viewPrinter = async (req, res) => {
    try {
        let printerList = await printerService.listPrinter();
        return res.render("printer.ejs", {
            list: printerList
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const viewEdit = async (req, res, next) => {
    try {
        let printerId = (req.params.id == '' || !req.params.id) ? null : parseInt(req.params.id);
        if (printerId == null) throw error("printer not found");
        let printer = await printerService.getPrinter(printerId);
        return res.render("editPrinter.ejs", {
            printer: printer
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const viewCreatePrinter = (req, res, next) => {
    return res.render("addPrinter.ejs");
}

const viewAddPaper = async (req, res, next) => {
    try {
        let printerId = (req.params.id == '' || !req.params.id) ? null : parseInt(req.params.id);
        if (printerId == null) throw error("printer not found");
        let printer = await printerService.getPrinter(printerId);
        return res.render("addPaperPrinter.ejs", {
            printer: printer
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const createPrinter = async (req, res, next) => {
    try {
        let printerName = req.body.name;
        let printerLocation = req.body.location;
        let printerPapers = req.body.papers || 100;
        let printerStatus = req.body.status || false;
        let printerTasks = 0;
        await printerService.createPrinter(
            printerName,
            printerLocation,
            printerPapers,
            printerStatus,
            printerTasks
        );
        //do something
        return res.redirect('/printer');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const getPrinter = async (req, res, next) => {
    try {
        let printerList = await printerService.listPrinter();
        return res.status(200).json({
            message: "get printers successfully",
            list: printerList
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const updatePrinter = async (req, res, next) => {
    try {
        let id = parseInt(req.body.id);
        let name = req.body.name;
        let location = req.body.location;
        await printerService.updatePrinter(id, name, location);
        return res.redirect('/printer');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const deletePrinter = async (req, res, next) => {
    try {
        let id = parseInt(req.body.id);
        await printerService.deletePrinter(id);
        return res.redirect('/printer');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const turnOn = async (req, res, next) => {
    try {
        let printerId = (req.body.id == '') ? null : parseInt(req.body.id);
        if (printerId == null) throw error("printer not found");
        await printerService.turnOn(printerId);
        res.redirect('/printer');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const turnOff = async (req, res, next) => {
    try {
        let printerId = (req.body.id == '') ? null : parseInt(req.body.id);
        if (printerId == null) throw error("printer not found");
        await printerService.turnOff(printerId);
        res.redirect('/printer');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const addPaper = async (req, res, next) => {
    try {
        let printerId = (req.body.id == '' || !req.body.id) ? null : parseInt(req.body.id);
        let addPaper = (req.body.AddingPapers == '') ? 0 : parseInt(req.body.AddingPapers);
        await printerService.addPaper(printerId, addPaper);
        res.redirect('/printer')
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    viewPrinter,
    viewCreatePrinter,
    viewEdit,
    viewAddPaper,
    createPrinter,
    updatePrinter,
    deletePrinter,
    getPrinter,
    turnOn,
    turnOff,
    addPaper,
}
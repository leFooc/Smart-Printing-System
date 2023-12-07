const orderService = require("../services/orderService");
const fileService = require("../services/fileService");

const createOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        const printerId = parseInt(req.body.printerId);
        const fileId = parseInt(req.body.fileId);
        const copies = parseInt(req.body.copies);
        const isPortrait = req.body.isPortrait == "true" ? true : false;
        const isA4 = req.body.isA4 == "true" ? true : false;
        const properties = await fileService.countPage(fileId);
        await orderService.createOrder(
            userId,
            printerId,
            fileId,
            copies,
            isPortrait,
            isA4,
            properties,
            next
        );
        res.status(200).json({
            message: "create order successfully"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const getListByUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        let list = await orderService.getListByUser(userId);
        res.status(200).json({
            message: "get user's orders information successfully",
            list: list
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const getListByPrinter = async (req, res, next) => {
    try {
        const printerId = parseInt(req.params.printerId);
        let list = await orderService.getListByPrinter(printerId);
        res.status(200).json({
            message: "get printer's orders information successfully",
            list: list
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    createOrder,
    getListByUser,
    getListByPrinter
}
const express = require("express");
const printerController = require("../controllers/printerController");

const router = express.Router();

router.get('/', printerController.viewPrinter);

router.get('/create', printerController.viewCreatePrinter);

router.post('/create', printerController.createPrinter);

router.get('/edit/:id', printerController.viewEdit);

router.post('/edit/', printerController.updatePrinter);

router.post('/delete', printerController.deletePrinter);

router.post('/turnon', printerController.turnOn);

router.post('/turnoff', printerController.turnOff);

router.get('/addpaper/:id', printerController.viewAddPaper);

router.post('/addpaper', printerController.addPaper);

router.get('/list', printerController.getPrinter);

router.post('/check', (req, res) => {
    console.log(req.body)
    res.send("ok");
});

module.exports = router;
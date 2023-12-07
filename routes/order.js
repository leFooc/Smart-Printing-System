const express = require("express");
const order = require("../controllers/orderController");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.post('/create',
    authToken,
    order.createOrder
);

router.get('/history',
    authToken,
    order.getListByUser
);

router.get('/history/:printerId',
    order.getListByPrinter
)

module.exports = router;
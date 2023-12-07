const express = require("express");
const user = require("../controllers/userController");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.post("/signup",
    user.signUp
);

router.post("/signin",
    user.signIn
);

router.get("/",
    authToken,
    user.getUserInfo
);

router.get("/purchase-history",
    authToken,
    user.getPurchaseHistory
);

router.post("/purchase",
    authToken,
    user.purchasePaper
);


module.exports = router;
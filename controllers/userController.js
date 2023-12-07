require('dotenv').config();
const bcrypt = require("bcryptjs");

const userService = require('../services/userService');

const signUp = async (req, res, next) => {
    try {
        let userName = req.body.userName;
        if (userName == "") {
            const error = new Error("Username is required");
            error.statusCode = 400;
            throw error;
        }

        let password = req.body.password;
        if (password == "") {
            const error = new Error("Password is required");
            error.statusCode = 400;
            throw error;
        }

        let paper = parseInt(process.env.STUDENTPAPER);

        await userService.createUser(
            userName,
            password,
            paper
        );
        res.status(200).json({
            message: "sign up successfully"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const signIn = async (req, res, next) => {
    try {
        let userName = req.body.userName;
        if (userName == "") {
            const error = new Error("Username is required");
            error.statusCode = 400;
            throw error;
        }

        let password = req.body.password;
        if (password == "") {
            const error = new Error("Password is required");
            error.statusCode = 400;
            throw error;
        }

        const user = await userService.authUser(userName, password);
        const accessToken = await userService.genToken(user);
        res.status(200).json({
            message: "sign in successfully",
            token: accessToken,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        const userId = req.userId;
        user = await userService.getUser(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "get user's information successfully",
            user: user
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getPurchaseHistory = async (req, res, next) => {
    try {
        //res.send("get purchase history from controller");
        const userId = req.userId;
        const list = await userService.getBills(userId);
        res.status(200).json({
            message: "get user's purchase information successfully",
            list: list
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

const purchasePaper = async (req, res, next) => {
    try {
        //res.send("buy paper from controller");
        const userId = req.userId;
        const paper = parseInt(req.body.paper);
        const cost = paper * (process.env.PAPERPRICE || 1000);

        userService.createBill(userId, paper, cost);
        res.status(200).json({
            message: "create purchase successfully"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    signUp,
    signIn,
    getUserInfo,
    getPurchaseHistory,
    purchasePaper,
};
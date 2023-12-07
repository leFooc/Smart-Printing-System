require('dotenv').config();
const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (userName, password, paper) => {
    let checkUser = await db.User.findOne({
        where: { userName: userName }
    });
    if (checkUser) {
        const error = new Error("Username exists");
        error.statusCode = 400;
        throw error;
    }

    let salt = await bcrypt.genSalt(10);
    let hashPasword = bcrypt.hashSync(password, salt);

    let user = await db.User.create({
        userName: userName,
        password: hashPasword,
        profilePictur: "123",
        paper: paper,
        dataUsed: 0
    });
    await user.save();
}

const authUser = async (userName, password) => {
    let user = await db.User.findOne({
        where: { userName: userName }
    });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        const error = new Error("Password not match");
        error.statusCode = 400;
        throw error;
    }

    return user;
}

const genToken = async (user) => {
    const data = {
        userId: user.id,
        name: user.userName
    };
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' });
}

const getUser = async (userId) => {
    let user = await db.User.findOne({
        raw: true,
        where: { id: userId }
    });
    return user;
}

const createBill = async (userId, paper, cost) => {
    let user = await db.User.findOne({
        where: { id: userId }
    });

    let bill = await db.Paybill.create({
        userId: userId,
        paper: paper,
        cost: cost
    })

    user.paper += paper;
    await user.save();
    await bill.save();
}

const getBills = async (userId) => {
    let list = [];
    list = await db.Paybill.findAll({
        raw: true,
        where: { userId: userId }
    });
    return list;
}


module.exports = {
    createUser,
    authUser,
    genToken,
    getUser,
    createBill,
    getBills,
}
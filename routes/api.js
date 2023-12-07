// throw api for React(if have React)
const express = require("express");
const user = require('./user');
const printer = require('./printer');
const file = require('./file');
const order = require('./order');

const routesConfig = (app) => {
    app.use('/user', user);
    app.use('/printer', printer);
    app.use('/file', file);
    app.use('/order', order);
}

module.exports = routesConfig;
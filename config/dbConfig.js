//using MySQL
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, null, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect to database successfully !");
    } catch (error) {
        console.log("Failed to connect to database:", error);
    }
}

module.exports = dbConnection;
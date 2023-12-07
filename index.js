//basic import
const express = require("express");
const configViewEngine = require("./config/viewEngineConfig");
const configBodyParser = require("./config/bodyParser");
const dbConnection = require("./config/dbConfig");
const cors = require("cors");
//route import
const routesConfig = require("./routes/api");
require("dotenv").config();

//config app
const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

dbConnection();
configBodyParser(app);
routesConfig(app);
configViewEngine(app);

//run app
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
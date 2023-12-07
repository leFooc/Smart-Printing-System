const bodyParser = require('body-parser');

const configBodyParser = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}

module.exports = configBodyParser;
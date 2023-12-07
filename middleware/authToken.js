const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = async (req, res, next) => {
    const authorizationClient = req.headers['authorization'];
    const token = authorizationClient && authorizationClient.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        let payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = payload.userId;
        //console.log(payload);
        next();
    } catch (e) {
        return res.sendStatus(403)
    }
}

module.exports = authToken;
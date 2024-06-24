
const { jwt } = require('jsonwebtoken');
const jwt_secret = "ajay";

const authMiddleware = async (req, res, next) => {
    const authorization = req.header.authorization;
    const bear_token = authorization.split(" ");
    const token = bear_token[1];
    const decode = await jwt.verify(token, jwt_secret);
    if (decode) {
        req.userId = decode.userId;
        next();
    }
    else {
        return res.status(403).json({});
    }

}

module.exports = authMiddleware;
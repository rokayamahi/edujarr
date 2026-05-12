const jwt = require("jsonwebtoken");
const { apiResponse } = require("../utils/apiResponse");

exports.authorize = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (
        req.cookies.accesstoken ||
        (authorization && authorization.startsWith("Bearer"))
    ) {
        const token =
            req.cookies.accesstoken || authorization.split(" ")[1];

        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
        return apiResponse(res, 401, false, "Invalid or expired token");
        }
    req.user = decoded; 
    next();
});
    } else {
        console.log("No Token Found in Request");
        return apiResponse(res, 401, false, "Invalid token type");
    }
};
const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //Wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 404);
    }

    //Mongo dublicate key errors
    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 404);
    }

    //Wrong jwt error
    if (err.code === "JsonWebTokenError") {
        const message = `Token invalid, try again`;
        err = new ErrorHandler(message, 404);
    }

    //jwt expire error
    if (err.code === "TokenExpiredError") {
        const message = `Token Expire, try again`;
        err = new ErrorHandler(message, 404);
    }
    console.log(err)
    res.status(err.statusCode).json({
        success: false,
        error: err.stack,
        message: err.message,
    });
};

exports.apiResponse = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({
        success: statusCode >= 400 ? false : success,
        message: message,
        data: data
    });
};
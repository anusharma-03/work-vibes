const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};

const sendError = (res, message, statusCode = 400) => {
    console.error(`❌ API Error: ${message}`);
    res.status(statusCode).json({ message });
};

module.exports = {
    sendSuccess,
    sendError
};

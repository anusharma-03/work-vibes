/**
 * Standard success response handler
 */
const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};

/**
 * Standard error response handler with logging
 */
const sendError = (res, message, statusCode = 400) => {
    console.error(`❌ API Error [${statusCode}]: ${message}`);
    
    // Provide a consistent error structure
    res.status(statusCode).json({
        success: false,
        message,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    sendSuccess,
    sendError
};

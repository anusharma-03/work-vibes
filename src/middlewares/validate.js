const mongoose = require('mongoose');
const { sendError } = require('../utils/responseHandler');

/**
 * Middleware to check if database is connected
 */
const checkDbConnection = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return sendError(res, 'Database not connected. Please check your MongoDB status.', 503);
    }
    next();
};

/**
 * Simple middleware to validate required fields in the request body
 * @param {string[]} requiredFields - Array of field names that must be present
 */
const validateFields = (requiredFields) => {
    return (req, res, next) => {
        console.log(`🔍 [Validation] Checking fields for ${req.originalUrl}:`, requiredFields);
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            console.error(`❌ [Validation] Failed! Missing: ${missingFields.join(', ')}`);
            console.error('📦 [Validation] Received body:', JSON.stringify(req.body, null, 2));
            return sendError(res, `Missing required fields: ${missingFields.join(', ')}`, 400);
        }
        
        next();
    };
};

module.exports = {
    validateFields,
    checkDbConnection
};

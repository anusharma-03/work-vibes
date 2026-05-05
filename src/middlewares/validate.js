const { sendError } = require('../utils/responseHandler');

/**
 * Simple middleware to validate required fields in the request body
 * @param {string[]} requiredFields - Array of field names that must be present
 */
const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return sendError(res, `Missing required fields: ${missingFields.join(', ')}`, 400);
        }
        
        next();
    };
};

module.exports = {
    validateFields
};

const settingService = require('../services/settingService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getSettings = async (req, res) => {
    try {
        const settings = await settingService.getSettings();
        sendSuccess(res, settings);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

const updateSetting = async (req, res) => {
    try {
        const { key, value } = req.body;
        if (!key) {
            return sendError(res, 'Setting key is required', 400);
        }
        const updatedSetting = await settingService.updateSetting(key, value);
        sendSuccess(res, updatedSetting);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

module.exports = {
    getSettings,
    updateSetting
};

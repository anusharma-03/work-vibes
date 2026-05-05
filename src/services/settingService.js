const Setting = require('../models/Setting');

class SettingService {
    async getSettings() {
        const settings = await Setting.find();
        // Convert to key-value object for easier frontend use
        return settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    }

    async updateSetting(key, value) {
        return await Setting.findOneAndUpdate(
            { key },
            { value },
            { upsert: true, new: true }
        );
    }
}

module.exports = new SettingService();

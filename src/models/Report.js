const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    reportType: { type: String, required: true, enum: ['SOD', 'EOD'] },
    date: { type: Date, default: Date.now },
    projects: [{
        name: { type: String, required: true },
        tasks: [{ type: String, required: true }]
    }],
    mood: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);

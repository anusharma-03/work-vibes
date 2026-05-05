const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    group: { type: String },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

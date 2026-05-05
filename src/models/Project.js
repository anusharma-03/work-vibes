const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  team: { type: String, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['On Track', 'At Risk', 'Completed'], default: 'On Track' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

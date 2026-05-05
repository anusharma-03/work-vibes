const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    account: { type: String, required: true },
    trackingUrl: { type: String },
    
    // New fields from reference site
    client: { type: String },
    status: { 
        type: String, 
        enum: ['Live', 'Ongoing', 'Completed', 'On Hold'],
        default: 'Ongoing'
    },
    description: { type: String },
    notes: { type: String },
    projectLink: { type: String },
    
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    
    credentials: [{
        name: String,
        url: String,
        type: { type: String, enum: ['login', 'api'], default: 'login' },
        username: String,
        password: { type: String }, // Plain text for now as per reference usage, though not ideal
        apiKeys: [String],
        details: String
    }],
    
    documents: {
        client: [{ name: String, url: String, type: { type: String, enum: ['file', 'link'] } }],
        company: [{ name: String, url: String, type: { type: String, enum: ['file', 'link'] } }],
        self: [{ name: String, url: String, type: { type: String, enum: ['file', 'link'] } }],
        milestone: [{ name: String, url: String, type: { type: String, enum: ['file', 'link'] } }]
    },
    
    links: [{
        title: String,
        url: String
    }],
    
    milestones: [{
        heading: String,
        tasks: [String]
    }],
    
    technologies: {
        database: String,
        backend: String,
        website: String,
        mobileApp: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

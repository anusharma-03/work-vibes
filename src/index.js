require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const Report = require('./models/Report');
const User = require('./models/User');
const projectRoutes = require('./routes/projectRoutes');

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Work Vibes API is running...' });
});

// Submit a new report
app.post('/api/reports', async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all reports
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Users Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ name: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        console.log('👤 POST /api/users - Payload:', req.body);
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log('✅ User saved:', savedUser.name);
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('❌ Error saving user:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Projects Routes
app.use('/api/projects', projectRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

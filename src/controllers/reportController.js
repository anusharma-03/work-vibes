const reportService = require('../services/reportService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getReports = async (req, res) => {
    try {
        const reports = await reportService.getAllReports();
        sendSuccess(res, reports);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

const createReport = async (req, res) => {
    try {
        console.log('📝 POST /api/reports - Payload:', req.body);
        const newReport = await reportService.createReport(req.body);
        console.log('✅ Report saved for:', newReport.userName);
        sendSuccess(res, newReport, 201);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

module.exports = {
    getReports,
    createReport
};

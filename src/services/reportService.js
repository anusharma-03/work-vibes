const Report = require('../models/Report');

class ReportService {
    async getAllReports() {
        return await Report.find().sort({ createdAt: -1 });
    }

    async createReport(reportData) {
        const newReport = new Report(reportData);
        return await newReport.save();
    }
}

module.exports = new ReportService();

const githubService = require('../services/githubService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getCommits = async (req, res) => {
    try {
        const { repoUrl, account, date } = req.query;

        if (!repoUrl || !account || !date) {
            return sendError(res, 'repoUrl, account, and date are required', 400);
        }

        console.log(`🔍 Fetching GitHub commits for ${repoUrl} on ${date}...`);
        const commits = await githubService.getCommits(repoUrl, account, date);
        console.log(`✅ Found ${commits.length} commits.`);
        
        sendSuccess(res, commits);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

module.exports = {
    getCommits
};

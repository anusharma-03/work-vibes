const axios = require('axios');
const settingService = require('./settingService');

class GithubService {
    async getCommits(repoUrl, account, date) {
        try {
            // 1. Get tokens from settings
            const settings = await settingService.getSettings();
            
            const tokens = settings.github_tokens || {};

            const token = tokens[account];

            if (!token) {
                throw new Error(`No GitHub token found for account: ${account}`);
            }

            // 2. Extract owner and repo from URL
            // Expected format: https://github.com/owner/repo or owner/repo
            const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || repoUrl.match(/^([^/]+)\/([^/]+)$/);
            if (!match) {
                throw new Error('Invalid GitHub repository URL');
            }

            const owner = match[1];
            const repo = match[2].replace(/\.git$/, '');

            // 3. Prepare date range (since date T00:00:00Z to date T23:59:59Z)
            const since = new Date(date);
            since.setHours(0, 0, 0, 0);
            
            const until = new Date(date);
            until.setHours(23, 59, 59, 999);

            // 4. Fetch commits from GitHub API
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                params: {
                    since: since.toISOString(),
                    until: until.toISOString()
                },
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            // 5. Extract commit messages
            return response.data.map(commit => commit.commit.message);
        } catch (error) {
            console.error('GitHub API Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || error.message);
        }
    }
}

module.exports = new GithubService();

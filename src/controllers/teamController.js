const teamService = require('../services/teamService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getTeams = async (req, res) => {
    try {
        const teams = await teamService.getAllTeams();
        sendSuccess(res, teams);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

const createTeam = async (req, res) => {
    try {
        console.log('👥 POST /api/teams - Payload:', req.body);
        const newTeam = await teamService.createTeam(req.body);
        console.log('✅ Team saved:', newTeam.name);
        sendSuccess(res, newTeam, 201);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

module.exports = {
    getTeams,
    createTeam
};

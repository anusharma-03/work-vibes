const teamService = require('../services/teamService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getTeams = async (req, res, next) => {
    try {
        const teams = await teamService.getAllTeams();
        sendSuccess(res, teams);
    } catch (err) {
        next(err);
    }
};

const createTeam = async (req, res, next) => {
    try {
        console.log('👥 [Team] POST /api/teams - Creating team:', req.body.name);
        const newTeam = await teamService.createTeam(req.body);
        console.log('✅ [Team] Created successfully:', newTeam.name);
        sendSuccess(res, newTeam, 201);
    } catch (err) {
        if (err.code === 11000) {
            return sendError(res, 'Team with this name already exists', 400);
        }
        next(err);
    }
};

module.exports = {
    getTeams,
    createTeam
};

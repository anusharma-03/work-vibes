const Team = require('../models/Team');

class TeamService {
    async getAllTeams() {
        return await Team.find().populate('users', 'name');
    }

    async createTeam(teamData) {
        const newTeam = new Team(teamData);
        const savedTeam = await newTeam.save();
        return await Team.findById(savedTeam._id).populate('users', 'name');
    }
}

module.exports = new TeamService();

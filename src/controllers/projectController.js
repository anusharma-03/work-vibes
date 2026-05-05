const projectService = require('../services/projectService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        sendSuccess(res, projects);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

const createProject = async (req, res) => {
    try {
        console.log('📦 POST /api/projects - Payload:', req.body);
        const newProject = await projectService.createProject(req.body);
        console.log('✅ Project saved:', newProject.name);
        sendSuccess(res, newProject, 201);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

module.exports = {
    getProjects,
    createProject
};

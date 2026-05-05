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

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProjectById(id);
        if (!project) {
            return sendError(res, 'Project not found', 404);
        }
        sendSuccess(res, project);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

const createProject = async (req, res) => {
    try {
        const newProject = await projectService.createProject(req.body);
        sendSuccess(res, newProject, 201);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await projectService.updateProject(id, req.body);
        if (!updatedProject) {
            return sendError(res, 'Project not found', 404);
        }
        sendSuccess(res, updatedProject);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await projectService.deleteProject(id);
        if (!deletedProject) {
            return sendError(res, 'Project not found', 404);
        }
        sendSuccess(res, { message: 'Project deleted successfully' });
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};

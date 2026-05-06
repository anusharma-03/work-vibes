const projectService = require('../services/projectService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getAllProjects();
        sendSuccess(res, projects);
    } catch (err) {
        next(err);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProjectById(id);
        if (!project) {
            return sendError(res, 'Project not found', 404);
        }
        sendSuccess(res, project);
    } catch (err) {
        next(err);
    }
};

const createProject = async (req, res, next) => {
    try {
        console.log('📁 [Project] POST /api/projects - Creating project:', req.body.name);
        const newProject = await projectService.createProject(req.body);
        console.log('✅ [Project] Created successfully:', newProject.name);
        sendSuccess(res, newProject, 201);
    } catch (err) {
        next(err);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(`📁 [Project] PUT /api/projects/${id} - Updating project`);
        const updatedProject = await projectService.updateProject(id, req.body);
        if (!updatedProject) {
            return sendError(res, 'Project not found', 404);
        }
        console.log('✅ [Project] Updated successfully');
        sendSuccess(res, updatedProject);
    } catch (err) {
        next(err);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(`📁 [Project] DELETE /api/projects/${id}`);
        const deletedProject = await projectService.deleteProject(id);
        if (!deletedProject) {
            return sendError(res, 'Project not found', 404);
        }
        console.log('✅ [Project] Deleted successfully');
        sendSuccess(res, { message: 'Project deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};

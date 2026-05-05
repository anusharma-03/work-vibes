const Project = require('../models/Project');

class ProjectService {
    async getAllProjects() {
        return await Project.find().sort({ name: 1 });
    }

    async getProjectById(id) {
        return await Project.findById(id).populate('teams', 'name');
    }

    async createProject(projectData) {
        const newProject = new Project(projectData);
        return await newProject.save();
    }

    async updateProject(id, projectData) {
        return await Project.findByIdAndUpdate(id, projectData, { new: true, runValidators: true })
            .populate('teams', 'name');
    }

    async deleteProject(id) {
        return await Project.findByIdAndDelete(id);
    }
}

module.exports = new ProjectService();

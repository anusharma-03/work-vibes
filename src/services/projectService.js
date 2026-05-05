const Project = require('../models/Project');

class ProjectService {
    async getAllProjects() {
        return await Project.find().sort({ createdAt: -1 });
    }

    async createProject(projectData) {
        const newProject = new Project(projectData);
        return await newProject.save();
    }
}

module.exports = new ProjectService();

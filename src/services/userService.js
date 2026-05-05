const User = require('../models/User');

class UserService {
    async getAllUsers() {
        return await User.find()
            .populate('team', 'name')
            .populate('projects', 'name')
            .sort({ name: 1 });
    }

    async createUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }

    async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true })
            .populate('team', 'name')
            .populate('projects', 'name');
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserService();

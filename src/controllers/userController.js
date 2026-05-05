const userService = require('../services/userService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        sendSuccess(res, users);
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

const createUser = async (req, res) => {
    try {
        console.log('👤 POST /api/users - Payload:', req.body);
        const newUser = await userService.createUser(req.body);
        console.log('✅ User saved:', newUser.name);
        sendSuccess(res, newUser, 201);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return sendError(res, 'User not found', 404);
        }
        sendSuccess(res, updatedUser);
    } catch (err) {
        sendError(res, err.message, 400);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return sendError(res, 'User not found', 404);
        }
        sendSuccess(res, { message: 'User deleted successfully' });
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};

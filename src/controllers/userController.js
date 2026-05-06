const userService = require('../services/userService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        sendSuccess(res, users);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        console.log('👤 [User] POST /api/users - Creating user:', req.body.name);
        const newUser = await userService.createUser(req.body);
        console.log('✅ [User] Created successfully:', newUser.name);
        sendSuccess(res, newUser, 201);
    } catch (err) {
        if (err.code === 11000) {
            return sendError(res, 'User with this name already exists', 400);
        }
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(`👤 [User] PUT /api/users/${id} - Updating user`);
        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return sendError(res, 'User not found', 404);
        }
        console.log('✅ [User] Updated successfully');
        sendSuccess(res, updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(`👤 [User] DELETE /api/users/${id}`);
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return sendError(res, 'User not found', 404);
        }
        console.log('✅ [User] Deleted successfully');
        sendSuccess(res, { message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};

const { sendSuccess, sendError } = require('../utils/responseHandler');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(`🔑 [Admin] Login attempt: ${username}`);

        if (username === 'admin' && password === 'admin') {
            console.log('✅ [Admin] Login successful');
            // Returning a dummy token for the flow
            return sendSuccess(res, { 
                success: true,
                message: 'Login successful',
                user: { username: 'admin', role: 'admin' },
                token: 'admin-auth-token-vibes' 
            });
        }

        console.log('❌ [Admin] Login failed: Invalid credentials');
        return sendError(res, 'Invalid username or password', 401);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
};

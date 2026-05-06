const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { validateFields, checkDbConnection } = require('../middlewares/validate');

// Admin login route
router.post('/login', validateFields(['username', 'password']), adminController.login);

module.exports = router;

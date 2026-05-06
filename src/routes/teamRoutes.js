const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { validateFields, checkDbConnection } = require('../middlewares/validate');

router.use(checkDbConnection);

router.get('/', teamController.getTeams);
router.post('/', validateFields(['name']), teamController.createTeam);

module.exports = router;

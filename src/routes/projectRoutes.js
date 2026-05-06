const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validateFields, checkDbConnection } = require('../middlewares/validate');

router.use(checkDbConnection);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateFields(['name', 'account']), projectController.createProject);
router.put('/:id', validateFields(['name', 'account']), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;

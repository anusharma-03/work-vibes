const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateFields, checkDbConnection } = require('../middlewares/validate');

router.use(checkDbConnection);

router.get('/', userController.getUsers);
router.post('/', validateFields(['name']), userController.createUser);
router.put('/:id', validateFields(['name']), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.get('/commits', githubController.getCommits);

module.exports = router;

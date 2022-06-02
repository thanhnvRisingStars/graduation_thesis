const express = require('express');
const router = express.Router();
const homeController = require('../controllers/user/home.controller');

router.get('/:slug', homeController.slug);
router.get('/happening-event/:slug', homeController.happeningEvent);
router.post('/register-event', homeController.registerEvent);
router.get('/', homeController.homepage);

module.exports = router;
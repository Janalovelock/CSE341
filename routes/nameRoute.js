const express = require('express');
const router = express.Router();
const baseController = require('../controllers');
router.get('/name', baseController.getName);
router.use('/contacts', require('./contacts'))

module.exports = router;

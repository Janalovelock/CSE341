const express = require('express');
const router = express.Router();
const baseController = require('../controllers');
router.get('/name', baseController.getName);


module.exports = router;

/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));
router.use('/name', require('./nameRoute'));

module.exports=router;
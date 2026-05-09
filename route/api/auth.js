const express = require('express');
const router = express.Router();
const { registrationController } = require('../../controller/auth.controller');

router.post('/registration', registrationController);


module.exports = router;
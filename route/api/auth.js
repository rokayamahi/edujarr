const express = require('express');
const router = express.Router();
const { registrationController, loginController, verifyOtpController } = require('../../controller/auth.controller');

router.post('/registration', registrationController);
router.post('/login', loginController);
router.post('/verify-otp',verifyOtpController);


module.exports = router;
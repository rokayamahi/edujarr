const express = require('express');
const { addBannerController } = require('../../controller/banner.controller');
const router = express.Router();
const upload = require('../../utils/upload'); 
const { authorize } = require('../../middleware/authorize');
const { authorizeRole } = require('../../middleware/authorizeRole');


router.post('/add-banner', authorize, authorizeRole('admin'), upload.single('bannerImage'), addBannerController);

module.exports = router;
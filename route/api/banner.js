const express = require('express');
const { addBannerController, findAllBannerController, deleteBannerController } = require('../../controller/banner.controller');
const router = express.Router();
const upload = require('../../utils/upload'); 
const { authorize } = require('../../middleware/authorize');
const { authorizeRole } = require('../../middleware/authorizeRole');


router.post('/add-banner', authorize, authorizeRole('admin'), upload.single('bannerImage'), addBannerController);

router.get("/all-banner", findAllBannerController);

router.delete("/delete-banner/:id", authorize, authorizeRole('admin'), deleteBannerController);

// router.patch("/update-banner/:id", updateBannerController);

module.exports = router;
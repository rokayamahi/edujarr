const bannerModel = require("../model/banner.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.addBannerController = asyncHandler(async (req, res) => {

    if (!req.file) {
        return apiResponse(res, 400, false, "No file uploaded!");
    }

    const { filename } = req.file;
    const { isActive } = req.body;

    const banner = new bannerModel({
        image: process.env.SERVER_URL + `/uploads/${filename}`,
        isActive: isActive || true
    });
    await banner.save();
    return apiResponse(res, 201, true, "Banner added successfully", banner);
});
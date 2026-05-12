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

exports.findAllBannerController = asyncHandler(async (req, res) => {
    const banners = await bannerModel.find();

    apiResponse(res, 200, true, "Banners retrieved successfully", banners);
});


exports.deleteBannerController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const banner = await bannerModel.findById(id);

    if (!banner) {
        return apiResponse(res, 404, false, "Banner not found");
    }

    const fileName = banner.image.split('/').pop();
    const filePath = `uploads/${fileName}`;
    try {
        await deleteFile(filePath); 
    } catch (err) {
        console.log("File delete error or file not found on disk");
    }
    await bannerModel.findByIdAndDelete(id);

    return apiResponse(res, 200, true, "Banner deleted successfully", banner);
});

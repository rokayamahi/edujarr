const { sendEmail } = require("../helpers/sendEmail");
const userModel = require("../model/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

exports.registrationController = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
   });

   //hash the password
   const hashPassword = await bcrypt.hash(password, 12);

   const user = new userModel({
      name,
      email,
      password: hashPassword,
      otp
   });

   await user.save();
   sendEmail()

   apiResponse(res, 201, true, 'User registered successfully', user);

})

exports.loginController = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const finduser = await userModel.findOne({ email }).select('+password');
   if (!finduser) {
      return apiResponse(res, 404, false, 'User not found');
   }

   const checkPassword = await bcrypt.compare(password, finduser.password);
   if (!checkPassword) {
      return apiResponse(res, 401, false, 'Invalid credentials');
   }

   const user = {
      _id: finduser._id,
      name: finduser.name,
      email: finduser.email,
      role: finduser.role
   };

   const token = jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1d' });

   return apiResponse(res, 200, true, 'Login successful', { ...user, token });
});

exports.verifyOtpController = asyncHandler(async (req, res) => { 
   const { email, otp } = req.body;

   const finduser = await userModel.findOne({ email });

   if (!finduser) {
      return apiResponse(res, 404, false, 'User not found');
   }

   if (finduser.otp !== parseInt(otp)) {
      return apiResponse(res, 400, false, 'Invalid OTP');
   }

   finduser.verified = true;
   finduser.otp = undefined;
   await finduser.save();

   return apiResponse(res, 200, true, 'OTP verified successfully');

});
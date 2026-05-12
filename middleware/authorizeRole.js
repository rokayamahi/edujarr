const { apiResponse } = require("../utils/apiResponse");

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role; 

    console.log(`Checking Role - Current: "${userRole}", Allowed: ${JSON.stringify(roles)}`);

    if (roles.includes(userRole)) {
      next();
    } else {
      return apiResponse(res, 403, false, "Access denied");
    }
  };
};
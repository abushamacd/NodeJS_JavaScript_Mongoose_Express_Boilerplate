const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  loginUserService,
  refreshTokenService,
  changePasswordService,
} = require("./auth.services");
const config = require("../../../src/config");

exports.loginUser = tryCatch(async (req, res) => {
  const result = await loginUserService(req.body);
  const { refreshToken, ...others } = result;

  // Set Refresh Token in Cookies
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: others,
  });
});

exports.refreshToken = tryCatch(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenService(refreshToken);

  // Set Refresh Token in Cookies
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

exports.changePassword = tryCatch(async (req, res) => {
  const { ...passwordData } = req.body;
  await changePasswordService(passwordData, req.user);
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

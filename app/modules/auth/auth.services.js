const httpStatus = require("http-status");
const { ApiError } = require("../../../src/errors/apiError");
const User = require("../user/user.model");
const { createToken, verifyToken } = require("../../../src/helpers/jwtHelpers");
const config = require("../../../src/config");
const bcrypt = require("bcrypt");

exports.loginUserService = async (payload) => {
  const { email: userEmail, password } = payload;

  // Existency Check
  const isExist = await User.isExist(userEmail);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Password Check
  if (
    isExist.password &&
    !(await User.isPasswordMatched(password, isExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create Access Token
  const { _id, id, role, email } = isExist;
  const accessToken = createToken(
    { _id, id, role, email },
    config.jwt.secret,
    config.jwt.expires_in
  );

  // Create Refresh Token
  const refreshToken = createToken(
    { _id, id, role, email },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

exports.refreshTokenService = async (token) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  const { email } = verifiedToken;
  let isExist = null;

  isExist = await User.isExist(email);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  //Generate New Access Token
  const newAccessToken = createToken(
    {
      _id: isExist._id,
      id: isExist.id,
      role: isExist.role,
      email: isExist.email,
    },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    accessToken: newAccessToken,
  };
};

exports.changePasswordService = async (payload, user) => {
  const { oldPassword, newPassword } = payload;
  const { email } = user;
  const isUserExist = await User.isExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // hass
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_solt_round)
  );

  const updatedData = {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate({ email }, updatedData);
};

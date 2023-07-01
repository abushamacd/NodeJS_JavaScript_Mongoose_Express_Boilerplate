const httpStatus = require("http-status");
const { ApiError } = require("../errors/apiError");
const { verifyToken } = require("../helpers/jwtHelpers");
const config = require("../config");

exports.auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      // Get Authorization Token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      // Varify Token
      let verifiedUser = null;
      verifiedUser = verifyToken(token, config.jwt.secret);
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

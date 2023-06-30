const { ZodError } = require("zod");
const { ApiError } = require("../errors/apiError");
const config = require("../config");
const { handleCastError } = require("../errors/handleCastError");
const { handleValidationError } = require("../errors/handleValidationError");
const { handleZodError } = require("../errors/handleZodError");
const { errorLogger } = require("../utilities/logger");

exports.globalError = (error, req, res, next) => {
  let statusCode = 400;
  let message = "Something went wrong";
  let errorMessage = [];

  // Dependency
  config.env === "development"
    ? console.log(`Global Error Handler ==`, error)
    : errorLogger.error(`Global Error Handler ==`, error);

  // Check
  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  // Return Response
  res.status(statusCode).send({
    success: false,
    message,
    errorMessage,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

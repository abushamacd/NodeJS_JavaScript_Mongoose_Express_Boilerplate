exports.handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  return {
    statusCode: 500,
    message: "Validation Error",
    errorMessage: errors,
  };
};

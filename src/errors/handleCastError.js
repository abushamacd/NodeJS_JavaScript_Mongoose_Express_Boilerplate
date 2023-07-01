exports.handleCastError = (error) => {
  const errors = [
    {
      path: error.path,
      message: "Invalid Id",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Cast Error",
    errorMessage: errors,
  };
};

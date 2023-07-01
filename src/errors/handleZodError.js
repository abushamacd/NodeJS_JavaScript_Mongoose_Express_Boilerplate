exports.handleZodError = (err) => {
  const errors = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 500,
    message: "Zod Error",
    errorMessage: errors,
  };
};

const httpStatus = require("http-status");
const { sendRes } = require("../../utilities/sendRes");
const { tryCatch } = require("../../utilities/tryCatch");
const { createDataService } = require("../services/data.services");

exports.createData = tryCatch(async (req, res) => {
  const result = await createDataService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data created successfully",
    data: result,
  });
});

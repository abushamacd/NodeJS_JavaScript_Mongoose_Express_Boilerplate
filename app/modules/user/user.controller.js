const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
} = require("./user.services");
const { paginationFields } = require("../../../src/constants/pagination");
const { pick } = require("../../../src/utilities/pick");
const { userFilterableFields } = require("./user.constant");

exports.createUser = tryCatch(async (req, res) => {
  const result = await createUserService(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

exports.getAllUsers = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, userFilterableFields);

  const result = await getAllUsersService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

exports.getSingleUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleUserService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

exports.updateUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await updateUserService(id, updatedData);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully",
    data: result,
  });
});

exports.deleteUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteUserService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User delete successfully",
    data: result,
  });
});

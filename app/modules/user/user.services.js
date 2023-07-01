const httpStatus = require("http-status");
const { ApiError } = require("../../../src/errors/apiError");
const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { userSearchableFields } = require("./user.constant");
const User = require("./user.model");
const { generateUserId } = require("./user.utils");
const bcrypt = require("bcrypt");
const config = require("../../../src/config");

exports.createUserService = async (payload) => {
  payload.role = "user";
  payload.id = await generateUserId();
  const user = await User.create(payload);
  if (!user) {
    throw new Error("User create failed");
  }
  const result = await User.findById(user._id);
  return result;
};

exports.getAllUsersService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filtering on field
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  // sorting
  let sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // output
  const result = await User.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

exports.getSingleUserService = async (id) => {
  const result = await User.findById(id);
  if (!result) {
    throw new Error("User not found !");
  }
  return result;
};

exports.updateUserService = async (_id, payload) => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const { role, id, password, ...userData } = payload;
  const updatedUserData = { ...userData };

  // // dynamicallly handel object data. example: when name has include firstname and lastname
  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach((key) => {
  //     const dataKey = `name.${key}`;
  //     updatedUserData[dataKey] = name[key];
  //   });
  // }

  if (password) {
    const dataKey = `password`;
    updatedUserData[dataKey] = await bcrypt.hash(
      password,
      Number(config.bcrypt_solt_round)
    );
  }

  const result = await User.findOneAndUpdate({ _id }, updatedUserData, {
    new: true,
  });

  if (!result) {
    throw new Error("User update failed");
  }

  return result;
};

exports.deleteUserService = async (id) => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const result = await User.findByIdAndDelete(id);

  if (!result) {
    throw new Error("User delete failed");
  }
  return result;
};

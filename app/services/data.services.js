const { Data } = require("../models/data.model");

exports.createDataService = async (payload) => {
  const user = await Data.create(payload);
  if (!user) {
    throw new Error("Data create failed");
  }
  const result = await Data.findById(user._id);
  return result;
};

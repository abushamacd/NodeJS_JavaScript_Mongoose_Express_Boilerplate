const Data = require("../models/Data");

// Get Data Service
exports.getDataService = async () => {
  const result = await Data.find({});
  return result;
};

// Save Data Service
exports.saveDataService = async (reqData) => {
  const data = new Data(reqData);
  const result = await data.save();
  return result;
};

// Update Data Service
exports.updateDataService = async (id, reqData) => {
  const result = await Data.updateOne(
    { _id: id },
    { $set: reqData },
    { runValidators: true }
  );
  return result;
};

// Update Multiple Data Service
exports.updateMultipleDataService = async (reqData) => {
  // const result = await Product.updateMany(
  //   { _id: reqData.ids },
  //   reqData.data,
  //   { runValidators: true }
  // );

  console.log(reqData);
  const products = [];

  reqData.forEach((product) => {
    products.push(Data.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);

  return result;
};

// Delete Data Service
exports.deleteDataService = async (id) => {
  const result = await Data.deleteOne({ _id: id });
  return result;
};

//Delete Multiple Data Service
exports.deleteMultipleDataService = async (reqData) => {
  const result = await Data.deleteMany({ _id: reqData.ids });
  return result;
};

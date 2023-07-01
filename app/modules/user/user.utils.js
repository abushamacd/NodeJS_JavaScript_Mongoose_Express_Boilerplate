const User = require("./user.model");

const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {
      role: "user",
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

exports.generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0");
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  return incrementedId;
};

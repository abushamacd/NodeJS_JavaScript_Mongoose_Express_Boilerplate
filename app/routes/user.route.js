const express = require("express");
const { reqValidate } = require("../../src/middleware/reqValidate");
const {
  createUserZod,
  updateUserZod,
} = require("../validation/user.validation");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.route("/").post(reqValidate(createUserZod), createUser).get(
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  getAllUsers
);

router
  .route("/:id")
  .get(
    // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
    getSingleUser
  )
  .patch(
    reqValidate(updateUserZod),
    // auth(ENUM_USER_ROLE.SELLER),
    updateUser
  )
  .delete(
    //   auth(ENUM_USER_ROLE.SELLER),
    deleteUser
  );

module.exports = router;

const express = require("express");
const { reqValidate } = require("../../middleware/reqValidate");
const {
  loginUserZod,
  refreshTokenZod,
  changePasswordZod,
} = require("../validation/auth.validation");
const {
  loginUser,
  refreshToken,
  changePassword,
} = require("../controllers/auth.controller");
const { USER_ROLE } = require("../../constants/user");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.route("/login").post(reqValidate(loginUserZod), loginUser);
router.route("/refresh-token").post(reqValidate(refreshTokenZod), refreshToken);
router
  .route("/change-password")
  .post(auth(USER_ROLE.USER), reqValidate(changePasswordZod), changePassword);

module.exports = router;

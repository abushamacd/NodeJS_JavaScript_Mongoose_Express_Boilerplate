const express = require("express");
const router = express.Router();
const { reqValidate } = require("../../middleware/reqValidate");
const { createData } = require("../controllers/data.controller");
const { createDataZod } = require("../validation/data.validation");

router.route("/").post(reqValidate(createDataZod), createData);
// .get(
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
//   getAllDatas
// );

// router
//   .route("/:id")
//   .get(
//     auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
//     getSingleData
//   )
//   .patch(reqValidate(updateDataZod), auth(ENUM_USER_ROLE.SELLER), updateData)
//   .delete(auth(ENUM_USER_ROLE.SELLER), deleteData);

module.exports = router;

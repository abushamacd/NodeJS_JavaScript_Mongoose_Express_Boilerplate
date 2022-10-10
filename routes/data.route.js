const express = require("express");
const router = express.Router();
const dataControllers = require("../controllers/data.controller");

router
  .route("/bulk-update")
  /**
   * @api {patch} /bulk-update
   * @apiDescription Update multiple data from body query
   * @apiPermission all
   */
  .patch(dataControllers.updateMultipleData);

router
  .route("/bulk-delete")
  /**
   * @api {delete} /bulk-delete
   * @apiDescription Delete multiple data from body query
   * @apiPermission all
   */
  .delete(dataControllers.deleteMultipleData);

router
  .route("/")
  /**
   * @api {get} /
   * @apiDescription Get all data
   * @apiPermission all
   */
  .get(dataControllers.getData)
  /**
   * @api {post} /bulk-delete
   * @apiDescription Sava data
   * @apiPermission all
   */
  .post(dataControllers.saveData);

router
  .route("/:id")
  /**
   * @api {patch} /:id
   * @apiDescription Updata data by id parameter
   * @apiPermission all
   */
  .patch(dataControllers.updateData)
  /**
   * @api {delete} /:id
   * @apiDescription Delete data by id parameter
   * @apiPermission all
   */
  .delete(dataControllers.deleteData);

module.exports = router;

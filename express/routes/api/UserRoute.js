var express = require("express");
var router = express.Router();

var userApiController = require("../../controllers/api/UserApiController");
var test = require("../../middleware/api/test");

router.get("/all", test, userApiController.getAllUsers);
router.get("/allext", test, userApiController.getAllUsersExt);
router.post("/create", test, userApiController.create);

module.exports = router;

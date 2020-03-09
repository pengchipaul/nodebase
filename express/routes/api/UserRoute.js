var express = require("express");
var router = express.Router();

var userApiController = require("../../controllers/api/UserApiController");
var test = require("../../middleware/test");

router.get("/all", test, function(req, res) {
	userApiController.getAllUsers(req, res);
});

router.get("/allext", test, function(req, res) {
	userApiController.getAllUsersExt(req, res);
});

router.post("/create", test, function(req, res) {
	userApiController.create(req, res);
});

module.exports = router;

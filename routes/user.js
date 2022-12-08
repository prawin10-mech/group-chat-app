const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/adduserdata", userController.postUser);

router.post("/postloginuser", userController.postloginuser);

router.get("/getuser/:userEmail", userController.getUser);

module.exports = router;

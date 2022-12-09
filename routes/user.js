const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/adduserdata", userController.postUser);

router.post("/postloginuser", userController.postloginuser);

router.get("/getuser/:userEmail", userController.getUser);

router.get("/getusers", userController.getUsers);

router.get("/newusercheck", userController.findLatestUser);

module.exports = router;

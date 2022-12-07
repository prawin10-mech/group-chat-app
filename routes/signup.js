const express = require("express");
const router = express.Router();

const signUpController = require("../controller/signUp");
router.get("/", signUpController.getHome);

router.post("/adduserdata", signUpController.postUser);

router.get("/getuser/:userEmail", signUpController.getUser);

module.exports = router;

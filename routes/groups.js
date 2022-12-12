const express = require("express");
const router = express.Router();

const groupController = require("../controller/groups");

router.post("/groups/addgroup", groupController.postCreateGroup);

router.get("/getgroups", groupController.getGroups);

router.get("/groups/userchats/:id", groupController.getGroupChats);

router.get("/groups/users/:id", groupController.getGroupUsers);

module.exports = router;

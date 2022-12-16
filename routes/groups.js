const express = require("express");

const router = express.Router();

const groupController = require("../controller/groups");

router.post("/groups/addgroup", groupController.postCreateGroup);

router.get("/getgroups", groupController.getGroups);

router.get("/groups/userchats/:id", groupController.getGroupChats);

router.get("/groups/users/:id", groupController.getGroupUsers);

router.get("/groups/getusers/:id", groupController.postEditUsers);

router.get("/groups/removeuser", groupController.getRemoveUser);

router.get("/groups/groupname/:id", groupController.getGroupName);

router.get("/groups/addusers", groupController.addUserToGroup);

router.get("/groups/adduser", groupController.addUser);

router.get("/groups/addusertogroup/:id", groupController.getAddUserToGroup);

router.get("groups/addusergroup", groupController.finalAddToGroup);

module.exports = router;

const express = require("express");
const router = express.Router();

const chatsRouter = require("../controller/chats");
const userAuthenticate = require("../middleware/authenticate");

router.post(
  "/chats/userschat",
  userAuthenticate.authenticate,
  chatsRouter.postUserChats
);

router.get("/getuserchats/:id", chatsRouter.getUserChats);
module.exports = router;

// router.get("/archivechats", chatsRouter.archiveChats);

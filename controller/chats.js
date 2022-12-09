const Chat = require("../models/chats");

exports.postUserChats = async (req, res) => {
  try {
    const userName = req.body.user;
    const message = req.body.message;
    const userId = req.user.id;

    const chat = await Chat.create({
      name: userName,
      message: message,
      userId: userId,
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUserChats = async (req, res) => {
  try {
    console.log(req.user);
    const chat = await Chat.findAll();
    res.send(chat);
  } catch (err) {
    console.log(err);
  }
};

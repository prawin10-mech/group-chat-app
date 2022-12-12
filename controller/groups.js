const Group = require("../models/groups");
const UserGroup = require("../models/usergroup");
const User = require("../models/user");
const Chat = require("../models/chats");

exports.postCreateGroup = async (req, res) => {
  try {
    const groupName = req.body.groupName;
    const group = await Group.create({
      groupName: groupName,
    });
    console.log("//////////////////////////////", group.dataValues.id);
    console.log(req.body.userIds);
    for (let i = 0; i < req.body.userIds.length; i++) {
      const userid = req.body.userIds[i];
      const usergroup = await UserGroup.create({
        groupId: group.dataValues.id,
        userId: userid,
      });
    }
    res.status(200).json({ message: "group was created", group: group });
  } catch (err) {
    res.status(400).json({ message: "oops there was an error" });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json({ groups: groups });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getGroupChats = async (req, res) => {
  const groupId = req.params.id;
  const groupChat = await Chat.findAll({ where: { groupId: groupId } });

  res.status(200).json({ success: true, groupChat });
};

exports.getGroupUsers = async (req, res) => {
  const groupId = req.params.id;
  const groupUser = await Group.findAll({ where: { id: groupId } });
  res.status(200).json({ success: true, groupUser });
};

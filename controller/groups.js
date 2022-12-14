const Group = require("../models/groups");
const UserGroup = require("../models/usergroup");
const User = require("../models/user");
const Chat = require("../models/chats");

const { Op } = require("sequelize");

exports.postCreateGroup = async (req, res) => {
  try {
    const createdBy = req.body.createdBy[0];
    const groupName = req.body.groupName;
    const group = await Group.create({
      groupName: groupName,
      createdBy,
    });
    console.log(createdBy);
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

exports.postEditUsers = async (req, res) => {
  const id = req.params.id;
  const group = await Group.findAll({ where: { id: id } });
  res.status(200).json({ success: true, group });
};

exports.getRemoveUser = (req, res) => {
  const userId = req.params.id.slice(0, -1);
  const groupId = req.params.id.slice(-1);
  const groupuser = UserGroup.destroy({ where: { userId, groupId } });
  res.send(groupuser);
};

exports.getGroupName = async (req, res) => {
  const groupId = req.params.id;
  const groupName = await Group.findAll({ where: { id: groupId } });
  res.status(200).send(groupName);
};

exports.addUserToGroup = async (req, res) => {
  const user = await User.findAll();
  res.status(200).send(user);
};

exports.addUser = async (req, res) => {
  const userId = req.params.id.slice(0, -1);
  const groupId = req.params.id.slice(-1);
  const addUser = await UserGroup.create({
    groupId,
    userId,
  });
  res
    .status(200)
    .json({ message: "user added successfully", success: true, addUser });
};

exports.getAddUserToGroup = async (req, res) => {
  const name = req.params.id;
  const user = await User.findAll({
    where: { [Op.or]: [{ name: name }, { phone: name }, { email: name }] },
  });
  res.status(200).json(user);
};

exports.finalAddToGroup = async (req, res) => {
  const userId = req.params.id.slice(0, -1);
  const groupId = req.params.id.slice(-1);
  const addUser = await UserGroup.create({
    groupId,
    userId,
  });
  res
    .status(200)
    .json({ message: "user added successfully", success: true, addUser });
};

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const shell = require("shelljs");

const app = express();

//express modules
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ extended: false }));

//database
const sequelize = require("./util/database");

//routes files importing
const userRouter = require("./routes/user");
const chatsRouter = require("./routes/chats");
const groupRouter = require("./routes/groups");

//routes
app.use(userRouter);
app.use(chatsRouter);
app.use(groupRouter);

//models
const Chat = require("./models/chats");
const User = require("./models/user");
const Group = require("./models/groups");
const UserGroup = require("./models/usergroup");
const Archived = require("./models/archivedChats");

const port = 8080;

//associations
User.hasMany(Chat);
Chat.belongsTo(User);

Chat.belongsTo(Group);
Group.hasMany(Chat);

Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });

sequelize
  .sync()
  .then(
    app.listen(port, () => {
      console.log(`server started at ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.static("views"));
app.use(
  cors({
    origin: "http://localhost:52330",
  })
);
app.use(bodyParser.json({ extended: false }));

const sequelize = require("./util/database");

const userRouter = require("./routes/user");
const chatsRouter = require("./routes/chats");
const groupRouter = require("./routes/groups");

app.use(userRouter);
app.use(chatsRouter);
app.use(groupRouter);

//models
const Chat = require("./models/chats");
const User = require("./models/user");
const Group = require("./models/groups");
const UserGroup = require("./models/usergroup");

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

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

app.use(userRouter);
app.use(chatsRouter);

//models
const Chat = require("./models/chats");
const User = require("./models/user");

const port = 8080;

//associations
User.hasMany(Chat);
Chat.belongsTo(User);

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

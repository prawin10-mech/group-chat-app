const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:52330",
  })
);
app.use(bodyParser.json({ extended: false }));

const sequelize = require("./util/database");

const userRouter = require("./routes/user");

app.use(userRouter);
const port = 8080;

sequelize
  .sync()
  .then(
    app.listen(8080, () => {
      console.log(`server started at ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

const sequelize = require("./util/database");

const signUpRouter = require("./routes/signup");

app.use(signUpRouter);
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

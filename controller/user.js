const User = require("../models/user");

const jwt = require("jsonwebtoken");

const Bcrypt = require("bcrypt");

exports.postUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const saltRounds = 10;
    Bcrypt.hash(password, saltRounds, async (err, hash) => {
      const user = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: hash,
      });
      res.status(200).json(user);
    });
  } catch (err) {
    console.log("user already exist");
    res.status(400).send(err);
  }
};

function generateJwtToken(id, email) {
  return jwt.sign({ userId: id, email: email }, process.env.TOKEN_SECRET);
}

exports.postloginuser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findAll({ where: { email: email } });
    console.log(password);
    Bcrypt.compare(password, user[0].password, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      }
      if (result) {
        res.send({
          success: true,
          message:
            "you have logged in successfully please wait until it redirects",
          token: generateJwtToken(user[0].id, user[0].email),
        });
      } else {
        res.send({
          success: false,
          message: "your password was incorrect",
        });
      }
    });
  } catch (err) {
    res.json({ message: "User Not found Please Try to Sign up" });
  }
};

exports.getUser = async (req, res, next) => {
  const userEmail = req.params.email;
  console.log(userEmail);
  const user = await User.findOne({ where: { email: userEmail } });
  if (user) {
    res
      .status(200)
      .json({ message: "user found please wait until loads", user: user });
  } else {
    res
      .status(404)
      .json({ message: "user found please wait until loads", user: user });
  }
};

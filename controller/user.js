const User = require("../models/user");

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

exports.postloginuser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.send(email);
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

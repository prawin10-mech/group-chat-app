const User = require("../models/user");

const Bcrypt = require("bcrypt");

exports.getHome = (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ message: "its now worked" });
};

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
    console.log(err);
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

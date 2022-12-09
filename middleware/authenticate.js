const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findByPk(userToken.userId);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

const { User } = require("../models/UserModel");

exports.index = (req, res) => {
  res.render("login");
  return;
};

exports.register = (req, res) => {
  const user = new User(req.body);
  user.register();
  res.send(user);
};

const { User, UserModel } = require("../models/UserModel");

exports.index = (req, res) => {
  res.render("login");
  return;
};

exports.register = async (req, res) => {
  try {
    const user = await new User(req.body);
    UserModel.create(user.getInfo());
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.render("403");
  }
};

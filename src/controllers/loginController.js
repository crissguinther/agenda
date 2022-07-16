const UserModel = require("../models/UserModel");
const User = require("../entities/User");
const bcrypt = require("bcrypt");

exports.index = (req, res) => {
  res.render("login");
  return;
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    const findUserQuery = await UserModel.find({ email: user.email });
    if (findUserQuery.length > 0) throw new Error("Email already in use");
    await UserModel.create({
      ...user.getInfo(),
      password: bcrypt.hashSync(user.password, 10),
    });
    res.redirect("back");
  } catch (e) {
    res
      .status(500)
      .render("error", { status: res.statusCode, error: e.toString() });
  }
};

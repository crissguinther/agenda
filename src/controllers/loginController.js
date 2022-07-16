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
    const salt = bcrypt.genSaltSync(10);
    if (findUserQuery.length > 0) throw new Error("Email already in use");
    await UserModel.create({
      ...user.getInfo(),
      password: bcrypt.hashSync(user.password, salt),
    });
    res.redirect("back");
  } catch (e) {
    res
      .status(500)
      .render("error", { status: res.statusCode, error: e.toString() });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) throw new Error("User does not exist");
    if (bcrypt.compareSync(password, foundUser.password)) {
      req.session.user = foundUser;
      req.session.save(() => res.redirect("/contatos"));
    }
  } catch (e) {
    res
      .status(500)
      .render("error", { status: res.statusCode, error: e.toString() });
  }
};

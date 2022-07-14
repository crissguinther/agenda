const validator = require("validator");
const mongoose = require("mongoose");
const validatePassword = require("../utils/validatePassword");
const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});

class User {
  constructor(body) {
    this.username = body.username;
    this.name = body.name;
    this.email = body.email;
    this.password = body.password;
  }

  set username(username) {
    if (typeof username != "string")
      throw new TypeError("Username must be a string");
    if (username.length < 3 || username.length > 12)
      throw new Error("Username must be between 3 and 12 characters long");
    this._username = username;
  }

  get username() {
    return this._username;
  }

  set email(email) {
    if (validator.isEmail(email) === false)
      throw new Error("Email must be valid");
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set password(password) {
    if (!validatePassword(password))
      throw new Error(
        "Password must be at least 8 characters longe, contain one uppercase letter, one lowercase letter, one number and one symbol"
      );
    this._password = password;
  }

  get password() {
    return this._password;
  }
}

module.exports = { User };

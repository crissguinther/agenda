const validatePassword = require("../utils/validatePassword");
const validator = require("validator");

class User {
  constructor(body) {
    Object.assign(this, body);
  }

  set name(name) {
    if (!name) throw new Error("You must provide a name");
    this._name = name;
  }

  get name() {
    return this._name;
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
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number and one symbol"
      );
    this._password = password;
  }

  get password() {
    return this._password;
  }

  getInfo() {
    return { name: this.name, email: this.email, password: this.password };
  }
}
module.exports = User;

const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
exports.genHash = async (password) => {
  const generatedPass = await bcrypt.hashSync(password, salt);
  return generatedPass;
};

exports.compareHash = async (passwordSent, passwordInDB) => {
  const isEqual = await bcrypt.compare(passwordInDB, passwordSent);
  return isEqual;
};

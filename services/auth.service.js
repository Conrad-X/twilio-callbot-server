const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const generateUserAndtoken = async (firstName, lastName, email, password) => {
  const user = User.build({
    firstName,
    lastName: lastName || "",
    email,
    password,
  });

  const token = jwt.sign(
    { userId: user.dataValues.id },
    process.env.JWT_SECRET_KEY_FOR_SIGNUP_LINK
  );
  return [user, token];
};

const generateLoginToken = (id) => {
  return jwt.sign({ accountId: id }, process.env.JWT_SECRET_KEY_FOR_LOGIN);
};

module.exports = {
  generateUserAndtoken,
  generateLoginToken,
};

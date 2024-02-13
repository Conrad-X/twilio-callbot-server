const { User } = require("../models");
const {
  transporter,
  getMailConfigurations,
} = require("../configs/nodemailer.config");
const {
  generateUserAndtoken,
  generateLoginToken,
} = require("../services/auth.service");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
require("dotenv").config();

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields are required", field: "all" });
  }
  try {
    if (await User.findOne({ where: { email } }))
      return res
        .status(400)
        .json({ error: "Email already exists", field: "email" });

    const hashPassword = await bcrypt.hash(password, 10);
    const [user, token] = await generateUserAndtoken(
      firstName,
      lastName,
      email,
      hashPassword
    );

    try {
      await transporter.sendMail(getMailConfigurations(email, token));
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Unable to send email", field: "email" });
    }

    await user.save();
    return res.status(200).json({ message: "User added and email sent" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
    // next()
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.body;

  if (!verificationToken)
    return res.status(400).json({ error: "Need a verification token" });

  try {
    const { userId } = jwt.verify(
      verificationToken,
      process.env.JWT_SECRET_KEY_FOR_SIGNUP_LINK
    );
    const user = await User.findByPk(userId);

    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.dataValues.status === "active") return res.status(400).json({ error: "User is already verified!" });

    await User.update({ status: "active" }, { where: { id: userId } });

    return res.status(200).json({ message: "Email verified!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "All fields are required", field: "all" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "Email not found", field: "email" });

    if (user.status !== "active") 
      return res.status(400).json({ error: "User not active" });

    if (await bcrypt.compare(password, user.dataValues.password)) {
      return res
        .status(200)
        .json({
          token: generateLoginToken(user.dataValues.accountId),
          firstName: user.dataValues.firstName,
          email: user.dataValues.email,
        });
    } else {
      return res
        .status(400)
        .json({ error: "Password did not match", field: "password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports = {
  signUp,
  verifyEmail,
  login,
};

const { User } = require("../models");

const addUser = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required", field: "all" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists", field: "email" });
    }

    const newUser = await User.create({ firstName, lastName, email, password, role });

    return res.status(200).json(newUser);
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const updateUser = async (req, res, next) => {
  const { id, firstName, lastName, email, password, role } = req.body;
// console.log("updateUser", id, firstName, lastName, email, password, role);
  if (!firstName || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required", field: "all" });
  }

  try {
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      return res.status(400).json({ error: "User with this id does not exist", field: "id" });
    }

    await User.update({ firstName, lastName, email, password, role }, { where: { id } });

    return res.status(200).send("Updated");
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const removeUser = async (req, res, next) => {
  const { id } = req.query;

  try {
    await User.destroy({ where: { id } });
    return res.status(200).send("Deleted");
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getUserList = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports = {
  addUser,
  removeUser,
  getUserList,
  updateUser,
};

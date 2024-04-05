const { Caller } = require("../models");

const addCaller = async (req, res, next) => {
  const { accountId, name, description, phoneNumber } = req.body;

  if (!name || !phoneNumber)
    return res
      .status(400)
      .json({ error: "All fields are required", field: "all" });

  try {
    const existingCaller = await Caller.findOne({
      where: { accountId, phoneNumber },
    });
    if (existingCaller)
      return res
        .status(400)
        .json({
          error: "Caller with this number already exists",
          field: "phoneNumber",
        });

    const newCaller = await Caller.create({
      accountId,
      name,
      description,
      phoneNumber,
    });

    return res.status(200).json(newCaller);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const updateCaller = async (req, res, next) => {
  const { id, name, description, phoneNumber } = req.body;

  console.log("updateCaller", id, name, description, phoneNumber);

  if (!name || !phoneNumber)
    return res
      .status(400)
      .json({ error: "All fields are required", field: "all" });

  try {
    const existingCaller = await Caller.findOne({ where: { id } });
    if (!existingCaller)
      return res
        .status(400)
        .json({
          error: "Caller with this number does not exists",
          field: "phoneNumber",
        });

    await Caller.update(
      {
        name,
        description,
        phoneNumber,
      },
      { where: { id } }
    );

    return res.status(200).send("Updated");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const removeCaller = async (req, res, next) => {
  const { id } = req.query;

  try {
    await Caller.destroy({ where: { id } });
    return res.status(200).send("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getCallerList = async (req, res, next) => {
  const { accountId } = req.body;
  console.log("caller list accout id", accountId);
  try {
    const callers = await Caller.findAll({
      where: {
        accountId,
      },
    });

    res.status(200).json(callers);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

const getCallerListPaginated = async (req, res, next) => {
  console.log("getCallerListPaginated called");
  console.log(req.body);
  const { accountId } = req.body;

  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  console.log("page", page, "limit", limit);
  try {
    const callers = await Caller.findAll({
      where: {
        accountId: accountId,
      },
      offset: (page - 1) * limit,
      limit: limit,
    });

    const count = await Caller.count({
      where: {
        accountId: accountId,
      },
    });

    total = 1;

    if (count > 0) {
      total = Math.ceil(count / limit);
    }

    res.status(200).json({ count: total, callers: callers });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports = {
  addCaller,
  removeCaller,
  getCallerList,
  getCallerListPaginated,
  updateCaller,
};

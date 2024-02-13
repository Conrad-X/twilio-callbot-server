const { Caller } = require("../models")

const addCaller = async (req, res, next) => {
    const { accountId, name, description, phoneNumber } = req.body

    if (!name || !phoneNumber)
        return res
        .status(400)
        .json({ error: "All fields are required", field: "all" });

    try {
        const existingCaller = await Caller.findOne({ where: { accountId, phoneNumber } });
        if (existingCaller) 
            return res.status(400).json({ error: "Caller with this number already exists", field: "phoneNumber" });

        const newCaller = await Caller.create({
            accountId,
            name,
            description,
            phoneNumber,
        })

        return res.status(200).json(newCaller)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "Something went wrong" });
    }
}

const removeCaller = async (req, res, next) => {
    const { id } = req.query

    try {
        await Caller.destroy({ where: { id } });
        return res.status(200).send("Deleted")
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "Something went wrong" });
    }
}

const getCallerList = async (req, res, next) => {
    const { accountId } = req.body;
    console.log(accountId);
    try {
        const callers = await Caller.findAll({
            where: {
              accountId,
            },
        });

        res.status(200).json(callers)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "Something went wrong" });
    }
}

module.exports = {
    addCaller,
    removeCaller,
    getCallerList,
}
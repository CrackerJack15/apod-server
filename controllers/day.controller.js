const { validationResult } = require("express-validator");

// Schema
const Day = require("../db/models/Day.schema");

const dayController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const { id } = req.params;

  try {
    const day = await Day.findOne({ id: Number(id) });
    res.json(day);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dayController;

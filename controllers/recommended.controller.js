const { validationResult } = require("express-validator");

// Schema
const Day = require("../db/models/Day.schema");

const recommendedController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const days = req.query?.days;

  if (!days) {
    return res.json({ error: true });
  }

  const formattedDays = days.map((day) => new Date(day));

  try {
    const data = await Day.find(
      { date: { $in: formattedDays } },
      { id: 1, pageType: 1, media: 1, title: 1, date: 1 }
    );
    res.json(data);
  } catch (error) {
    res.json({ error: true });
  }
};

module.exports = recommendedController;

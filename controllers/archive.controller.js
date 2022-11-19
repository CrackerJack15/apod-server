const { validationResult } = require("express-validator");
const endOfMonth = require("date-fns/endOfMonth");

// Schema
const Day = require("../db/models/Day.schema");

const archiveController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const { order, month, year } = req.query;

  const date = `${year}-${month}-01`;
  const startDate = new Date(date);
  const endDate = endOfMonth(new Date(startDate));

  const orderValue = order === "ascending" ? 1 : -1;

  try {
    const archive = await Day.find(
      { date: { $gte: startDate, $lte: endDate } },
      { id: 1, title: 1, date: 1, pageType: 1, media: 1 }
    ).sort({ date: orderValue });
    res.json(archive);
  } catch (error) {
    console.log(error);
    res.json({ status: "failed" });
  }
};

module.exports = archiveController;

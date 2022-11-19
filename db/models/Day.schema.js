const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  id: Number,
  date: {
    type: Date,
    unique: true,
  },
  pageType: String,
  media: Object,
  title: String,
  url: String,
  creditLinks: [{ text: String, url: String }],
  explanation: String,
  explanationLinks: [{ text: String, url: String }],
});

module.exports = mongoose.model("Day", daySchema);

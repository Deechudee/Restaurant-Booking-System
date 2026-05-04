const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: String,
  capacity: Number,
});

module.exports = mongoose.model("Table", tableSchema);
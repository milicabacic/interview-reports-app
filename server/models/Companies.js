const mongoose = require("mongoose");

const schema = mongoose.Schema({
  // autoCreate: false,
  name: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("company", schema);

module.exports = model;

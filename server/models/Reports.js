const mongoose = require("mongoose");

const schema = mongoose.Schema({
  candidate: {
    _id : {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
  },
  company: {
    _id : {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  phase: {
    type: String,
    enum: ["CV", "HR", "TECH", "FINAL"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Passed", "Declined"],
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
});

const model = mongoose.model("report", schema);

module.exports = model;

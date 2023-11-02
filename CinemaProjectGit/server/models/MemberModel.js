const mongoose = require("mongoose");

const memberschema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    City: { type: String, required: true },
    Email: { type: String, required: true },
  },
  { versionKey: false }
);

const member = mongoose.model("member", memberschema);
module.exports = member;

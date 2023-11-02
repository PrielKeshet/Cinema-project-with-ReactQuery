const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true },
    UserName: { type: String, required: true },
    PassWord: { type: Number, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

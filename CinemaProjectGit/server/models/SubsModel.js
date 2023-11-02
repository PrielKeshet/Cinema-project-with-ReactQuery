const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    MovieId: { type: String, required: true },
    MemberId: { type: String, required: true },
    Date: { type: String, required: true },
  },
  { versionKey: false }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Year: { type: Number, required: true },
    Geners: { type: [String], required: true },
    ImgUrl: { type: String, required: true },
  },
  { versionKey: false }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

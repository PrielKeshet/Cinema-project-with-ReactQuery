const mongoose = require("mongoose");
const connectdb = () => {
  mongoose
    .connect("mongodb://localhost:27017/moviesDB")
    .then(() => console.log("connected to moviesDB"))
    .catch((error) => console.log(error));
};

module.exports = connectdb;

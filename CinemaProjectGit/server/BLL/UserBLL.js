const User = require("../models/UserModel");

const GetAll = () => {
  return User.find({});
};

module.exports = {
  GetAll,
};

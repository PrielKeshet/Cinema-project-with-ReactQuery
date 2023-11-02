const Subs = require("../models/SubsModel");

const GetAll = () => {
  return Subs.find({});
};

const GetById = (id) => {
  return Subs.findById(id);
};
const AddItem = async (obj) => {
  const subs = new Subs(obj);
  await subs.save();
  return subs;
};

const Update = async (id, obj) => {
  await Subs.findByIdAndUpdate(id, obj);
  return obj;
};

const Delete = async (id) => {
  await Subs.findByIdAndDelete(id);
  return id;
};

module.exports = {
  GetAll,
  GetById,
  AddItem,
  Update,
  Delete,
};

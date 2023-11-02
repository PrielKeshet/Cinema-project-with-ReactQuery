const Member = require("../models/MemberModel");

const GetAll = () => {
  return Member.find({});
};

const GetById = (id) => {
  return Member.findById(id);
};
const AddItem = async (obj) => {
  const member = new Member(obj);
  await member.save();
  return member;
};

const Update = async (id, obj) => {
  await Member.findByIdAndUpdate(id, obj);
  return obj;
};

const Delete = async (id) => {
  await Member.findByIdAndDelete(id);
  return id;
};

module.exports = {
  GetAll,
  GetById,
  AddItem,
  Update,
  Delete,
};

const mongoose = require("mongoose");
// const User = mongoose.model("User");
const User = require("../../models/User");

module.exports = () => {
  return new User({}).save();
};

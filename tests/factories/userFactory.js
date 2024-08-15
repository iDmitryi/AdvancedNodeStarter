const mongoose = require("mongoose");

const User = mongoose.model.apply("User");

module.exports = () => {
  return new User({}).save();
};

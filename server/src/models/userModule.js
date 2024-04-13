const mongoose = require("mongoose");

// Define the roles enumeration
const rolesEnum = ["ADMIN", "STUDENT", "FORMATEUR"];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: rolesEnum, // Specify the enum values for the role field
    default: "STUDENT", // Set a default role if not specified
  },
  password: {
    type: String,
    required: true,
  },
  isActivee: {
    type: Boolean,
    default: false,
  },
  activationCode: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

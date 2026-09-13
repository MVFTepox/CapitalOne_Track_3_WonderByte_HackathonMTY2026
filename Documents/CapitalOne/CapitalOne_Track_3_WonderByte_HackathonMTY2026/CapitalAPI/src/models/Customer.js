const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  nessieCustomerId: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Customer", customerSchema);
const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  roomId: {
    type: mongoose.Types.ObjectId,
    ref: "rooms",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

customerSchema.index(
  { check_in :1, check_out: 1, roomId: 1  }, // this is for "check_in & check_out" want unique based on roomId
  {
    unique: true,
  }
);

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;

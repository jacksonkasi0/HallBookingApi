const mongoose = require("mongoose");

const Room = mongoose.model("rooms", {
  room_no: {
    type: String,
    unique: true,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  amenities: {
    wifi: {
      type: Boolean,
      default: false,
    },
    ac: {
      type: Boolean,
      default: false,
    },
    tv: {
      type: Boolean,
      default: false,
    },
    geyser: {
      type: Boolean,
      default: false,
    },
  },
  price_hr: {
    type: Number,
    required: true,
  },
  booked_status: {
    type: Boolean,
    default: false,
  },
  customers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "customers",
    },
  ],
});

module.exports = Room;

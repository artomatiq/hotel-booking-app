const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        reservedDates: [Date] ,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);

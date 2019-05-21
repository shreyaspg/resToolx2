var mongoose = require("mongoose");

var User = require("./users");

var bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Status: String,
  fromDate: Date,
  toDate: Date
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

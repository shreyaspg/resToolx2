var mongoose = require("mongoose"),
  User = require("./users"),
  Booking = require("./bookings");

var StorageSchema = new mongoose.Schema({
  Name: String,
  Type: String,
  Model: String,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
});

const Storage = mongoose.model("Storage", StorageSchema);

module.exports = Storage;

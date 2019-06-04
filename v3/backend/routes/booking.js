const express = require("express");
const router = express.Router();
const Storage = require("../database/models/storages");
const User = require("../database/models/users");
const Booking = require("../database/models/bookings");

router.post("/", (req, res, next) => {
  console.log("req.body", req.body);
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log("Error: ", err);
    } else if (foundUser) {
      console.log("User found");
      const newBooking = new Booking({
        user: foundUser,
        Status: "busy",
        fromDate: req.body.startDate,
        toDate: req.body.endDate
      });
      newBooking.save((err, savedUser) => {
        if (err) return res.send(err);
        else {
          Storage.findOneAndUpdate(
            { Model: req.body.model },
            { $push: { bookings: newBooking } },
            (err, foundStorage) => {
              if (err) {
                console.log("error", error);
              } else if (foundStorage) {
                // let newStorage = foundStorage;
                console.log("updated storage");
              }
            }
          );
        }
      });
    }
  });
});
router.get("/date", (req, res) => {
  res.send(new Date());
});
router.post("/bookingtable", (req, res) => {
  console.log("req.body", req.body);
  Storage.findOne({ Model: req.body.model })
    .populate({
      // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
      path: "bookings",
      populate: {
        path: "user"
      }
    })
    .exec((err, storages) => {
      console.log("returned storage", storages);
      res.send(storages);
    });
});
router.post("/booking", (req, res) => {
  Storage.find()
    .populate({
      // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
      path: "bookings",
      populate: {
        path: "user"
      }
    })
    .exec((err, storages) => {
      console.log("returned storage", storages);
      res.send(storages);
    });
});

module.exports = router;

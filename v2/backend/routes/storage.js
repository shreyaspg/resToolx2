const express = require("express");
const router = express.Router();
const Storage = require("../database/models/storages");
const User = require("../database/models/users");

router.get("/", (req, res, next) => {
  Storage.find({})
    .populate({
      // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
      path: "bookings",
      populate: {
        path: "user"
      }
    })
    .exec((err, storages) => {
      res.send(storages);
    });

  // Storage.create(
  //   {
  //     Name: "3Par",
  //     Type: "10k",
  //     Model: "10x6290",
  //     status: "free"
  //   },
  //   (err, storages) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(storages);
  //     }
  //   }
  // );
});
module.exports = router;

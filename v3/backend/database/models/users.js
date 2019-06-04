var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
// Define Schema methods
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    console.log("plainTextPassword", plainTextPassword);
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};
UserSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre saves");

    this.password = this.hashPassword(this.password);
    console.log("this.password", this.password);
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);

// UserSchema.plugin(passportLocalMongoose);
// module.exports = mongoose.model("User", UserSchema);

// CREATION ROUTE
// app.get("/", function(req, res) {
//   User.create({ username: "shreyyas", password: "pass" }, function(
//     err,
//     newUser
//   ) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(newUser);
//     }
//   });
// });

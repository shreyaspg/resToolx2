const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const app = express();
const PORT = 3001;
// Route requires
const user = require("./routes/user");
const storage = require("./routes/storage");
const book = require("./routes/booking");
// MIDDLEWARE
app.set("json spaces", 2);
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);
app.use("/storage", storage);
app.use("/book", book);
// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

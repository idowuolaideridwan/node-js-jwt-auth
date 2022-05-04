const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');

const app = express();

var corsOptions = {
origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// validator
app.use(bodyParser.json());
app.use(expressValidator());

// database
const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NEA API" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/payment.routes')(app);
require('./app/routes/location_user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// npm run start:dev
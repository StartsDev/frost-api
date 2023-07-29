const express = require("express");
const cors = require("cors");
const morgan= require("morgan");
const authRoutes = require("./routes/authRoutes");
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.PORT)

const app = express();
const port = process.env.PORT || 8000;

import db from "./models";
import { users } from "./seeders/users";
// Seeders Users
/* const createUsers = () => {
  users.forEach(function (user) {
    db.User.create(user);
  });
}; */

//createUsers();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//User Routes
app.use("/api/v1/auth", authRoutes);

// Server listen port
db.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    
  });
});

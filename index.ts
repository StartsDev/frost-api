const {sequelize} = require('./database/index')
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// import { users } from "./seeders/users";
// Seeders Users
// const createUsers = () => {
//   users.forEach(function (user) {
//     db.User.create(user);
//   });
// };

// createUsers();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//User Routes
app.use("/api/v1/auth", authRoutes);

// Server listen port
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
    
//   });
// });

// console.log(sequelize.models);
app.listen(port, () => {
  console.log('Server run on Port =>  ' + port)
  sequelize.sync({ force: true })
})
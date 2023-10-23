const { sequelize } = require('./database/index')
const fileUpload = require('express-fileupload')
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import identificationRoutes from "./routes/identificationRoutes";
import passwordRoutes from "./routes/passwordRoutes";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true
}));
app.use(morgan("tiny"));

//User Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/role", roleRoutes);
app.use("/api/v1/identification", identificationRoutes);
app.use("/api/v1/password", passwordRoutes);

// Server listen port
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`App listening on port ${port}`);

//   });
// });

app.listen(port, () => {
  console.log('Server run on Port =>  ' + port)
  sequelize.sync({ alter: true })
})

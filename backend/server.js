import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import dbConnection from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import registerUserRoute from "./routes/registerUserRoute.js";
import signInUserRoute from "./routes/signInUserRoute.js";
import signOutUserRoute from "./routes/signOutUserRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// const upload = multer({ dest: "uploads/" });
// rest object
const app = express();

// use ookie-parser middleware
app.use(cookieParser());

// config dotenv
dotenv.config();

// db connection called
dbConnection();

// cors configuration
app.use(cors());
// middlewares
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/product", productRoute);
app.use("/api/register/user", registerUserRoute);
app.use("/api/user", signInUserRoute);
app.use("/api/user", signOutUserRoute);

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgYellow);
});

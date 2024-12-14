import express from "express";
import colors from "colors";
import nodemon from "nodemon";
import dotenv from "dotenv";
import mongoDBconnect from "./config/mongoDB.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";
import messageRouter from "./routes/message.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

// initialization
const app = express();
dotenv.config();

// environment vari
const PORT = process.env.PORT || 9090;

// cross platform
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// set middlewers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
app.use(express.static("public"));

// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

// error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  mongoDBconnect();
  console.log(`server is running port: ${PORT}`.bgGreen.black);
});

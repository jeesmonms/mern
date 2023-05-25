import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

mongoose.connect("<connection string>");

app.listen(3005, () => {
  console.log("server running on 3005");
});

import express from "express";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";

const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  //console.log({ fullname, email, password });
  const user = await UserModel.findOne({ email: email });
  if (user) {
    return res.status(400).json({ status: false, msg: "Email already exists" });
  } //

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    fullname: fullname,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "user registered successfully" });
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "user doesn't exist" });
  }

  //comparing passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "username or password incorrect" });
  }

  res.json({ success: true, user });
});

//get user details
router.post("/userdetails", async (req, res) => {
  const { fullname } = req.body;

  const user = await UserModel.findOne({ fullname });
  const { email } = user;
  //console.log(email);
  res.json({ success: true, email });
});

export default router;

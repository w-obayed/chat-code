import asynsHandler from "express-async-handler";
import { isEmail } from "../helpers/helper.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @description create signup
 * @method POST
 * @route /api/v1/auth/signup
 * @access public
 */
export const signup = asynsHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.json({ message: "All fields are required" });
  }

  // valid email
  if (!isEmail(email)) {
    return res.json({ message: "Invalid email address" });
  }

  // email check
  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    return res.json({ message: "Email already exists" });
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    email,
    password: hashPass,
  });
  // response
  res.status(201).json({ user, message: "user create succcessful" });
});
/**
 * @description create login
 * @method POST
 * @route /api/v1/auth/login
 * @access public
 */
export const login = asynsHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.json({ message: "All fields are required" });
  }

  // valid email
  if (!isEmail(email)) {
    return res.json({ message: "Invalid email address" });
  }

  // find user
  const user = await User.findOne({ email }).select("password");

  //  check user
  if (!user) {
    return res.json({ message: "user not exists!" });
  }

  //   password compare
  const isvalid = await bcrypt.compare(password, user.password);

  //   password check
  if (!isvalid) {
    return res.json({ message: "wrong password!" });
  }

  //   create jwt
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // response
  res.status(201).json({ token, message: "user login succcessful" });
});

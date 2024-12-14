import asynsHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { fileDelete, fileUpload } from "../utils/cloudinary.js";
import { getPublicId, isEmail, isMobile } from "../helpers/helper.js";
import User from "../models/User.js";

/**
 * @description Get single users data
 * @method GET
 * @route /api/v1/user/logged-user
 * @access public
 */
export const getSingleUser = asynsHandler(async (req, res) => {
  // get single data
  const user = await User.findOne({ _id: req.body.userId });

  // not found user
  if (!user) {
    return res.status(404).json({ message: "user data not found!" });
  }

  res.status(200).json({ user, message: "user fetched successfull!" });
});

/**
 * @description Get all users data
 * @method Get
 * @route /api/v1/user/all-user
 * @access public
 */
export const getAllUser = asynsHandler(async (req, res) => {
  // user id
  const userId = req.body.userId;

  // get all user
  const users = await User.find({ _id: { $ne: userId } });

  //   check user data
  if (users.length === 0) {
    return res.status(404).json({ message: "user data not found!" });
  }

  res.status(200).json({ users, message: "users fetched successfull!" });
});

/**
 * @description create user data
 * @method POST
 * @route /api/v1/user/
 * @access public
 */
export const createUser = asynsHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // valid email
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // email check
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // valid phone number
  if (!isMobile(phone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // phone check
  const checkPhone = await User.findOne({ phone });
  if (checkPhone) {
    return res.status(400).json({ message: "Phone number already exists" });
  }

  // file upload
  let fileData = null;
  if (req.file) {
    const data = await fileUpload(req.file.path);
    fileData = data.secure_url;
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    email,
    phone,
    password: hashPass,
    photo: fileData,
  });
  // response
  res.status(201).json({ user, message: "user create succcessful" });
});

/**
 * @description delete user data
 * @method DELETE
 * @route /api/v1/user/:id
 * @access public
 */
export const deleteUser = asynsHandler(async (req, res) => {
  // get user id
  const { id } = req.params;

  // now delete user from database
  const user = await User.findByIdAndDelete(id);

  // delete cloud file
  await fileDelete(getPublicId(user.photo));

  // response
  res.status(200).json({ user, message: "User data delete successful" });
});

/**
 * @description update user data
 * @method PUT/PATCH
 * @route /api/v1/user/:id
 * @access public
 */
export const updateUser = asynsHandler(async (req, res) => {
  // get update user id
  const { id } = req.params;

  // get update data
  const { name, email, phone } = req.body;

  // valid email
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // valid phone number
  if (!isMobile(phone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // update data
  const user = await User.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  // response
  res.status(200).json({ user, message: "User data update successful" });
});

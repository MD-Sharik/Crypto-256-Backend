import dotenv from "dotenv";
import User from "../Models/User.model.js";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "./env",
});

const userExists = async (userName) => {
  const user = await User.findOne({ userName: userName });
  return !!user;
};

export const userLogin = async (req, res) => {
  try {
    const { userName } = req.body;
    const { password } = req.body;

    if (!(await userExists(userName))) {
      return res
        .status(400)
        .json({ message: "User does not exist in our DataBase" });
    }

    const token = jwt.sign({ userName }, process.env.JWTSECRET);

    res.status(200).json({ token, userName });
    console.log("user Logged in Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userSignup = async (req, res) => {
  const { userName } = req.body;
  const { password } = req.body;
  const { email } = req.body;
  const { name } = req.body;

  const exists = await userExists(userName);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const user = new User({
      userName: userName,
      password: password,
      email: email,
      name: name,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

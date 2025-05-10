import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  try {
    console.log(
      name,
      email,
      password,
      confirmPassword,
      role,
      " name , email , password, confirmPassword, role"
    );

    if (!name || !email || !password || !role) {
      return res.json({ success: false, message: "All fields are requried" });
    }

    if (password !== confirmPassword) {
      return res.json({ success: false, message: " Password incorrect" });
    }

    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res.json({ success: false, message: "User already exist" });
    }

    const hasdhedPassword = await bcrypt.hash(password, 10);
    console.log(hasdhedPassword, "hasdhedPassword");

    const newUser = new User({
      name,
      email,
      password: hasdhedPassword,
      role,
    });
    console.log(newUser, "newUser");

    await newUser.save();

    return res.json({ success: true, message: "Registration completed!" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while registering user",
    });
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist) {
      return res.json({ success: false, message: "User not found!" });
    }

    const isPasswordCorrect = bcrypt.compare(password, isUserExist.password);

    if (!isPasswordCorrect) {
      return res.json({ succcess: false, message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { name: isUserExist.name, email: isUserExist.email },
      process.env.SECRETKEY
    );

    console.log(token, "token");

    if (!token) {
      return res.json({
        success: false,
        message: "Error while generating token",
      });
    }

    return res.json({
      success: true,
      message: "Login Successful",
      userData: {
        name: isUserExist.name,
        email: isUserExist.email,
        role: isUserExist.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error while Login" });
  }
};
export const Profile = (req, res) => {};

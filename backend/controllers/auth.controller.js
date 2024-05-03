import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// the function is asynchronous because we save data to database(mongodb atlas)
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //   password encrytion using bcryptjs
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // save is builtin function to save data to database and is asynchronous
    await newUser.save();
    res.status(200).json({ message: "Signup successfull" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      // 404 status code is for user not found in db
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      // 400 status code is for bad request
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // JWT consists of three parts: a header, payload, and signature. The header typically consists of two parts: the type of the token, which is JWT, and the algorithm that is used, such as HMAC SHA256 or RSA SHA256. It is Base64Url encoded to form the first part of the JWT.
    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.SECRET_KEY
    );
    // removing the password
    validUser.password = undefined;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json(validUser);
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
      );
      user.password = undefined;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(user);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        profilePicture: googlePhotoUrl,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.SECRET_KEY
      );
      newUser.password = undefined;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, googleAuth };

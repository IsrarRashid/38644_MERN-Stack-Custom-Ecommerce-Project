import bcrypt from "bcrypt";
import { comparePassword } from "../helpers/authHelper.js";
import RegisterUserModel from "../models/registerUserModel.js";
import jwt from "jsonwebtoken";

export const signInUser = async (req, res) => {
  try {
    // extract the user sign-in data from the request body
    const { email, password } = req.body;

    // find the user by email in the database
    const user = await RegisterUserModel.findOne({ email });

    // if user not found, return an error
    if (!user) {
      console.log("email not found");
      return res.status(401).json({ error: "invalid credentials" });
    }

    // compare the provided password with hashed password in database
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      console.log("invalid password");
      return res.status(401).json({ error: "invalid email or password" });
    }

    // If email and password are valid and belong to the same user, sign in the user
    // You can generate a JWT token here and send it back to the client
    // JWT Token assigning if password match with the plain and hashed password

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    // update the user document with authToken
    user.authToken = token;
    await user.save();

    // set the jwt token as an HTTP-only cookie
    res.cookie("authToken", token, { httpOnly: true });
    // return a success response
    res.status(200).json({ message: "Sign-in Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

// protected route

export const protectedRoute = (req, res) => {
  // authorization middleware to verify the JWT token
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // verify the JWT token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // JWT token is valid, authorize the request
      // you can access the user Id from the decoded token, (e.g. decoded._id)

      res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

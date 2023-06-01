import bcrypt from "bcrypt";
import RegisterUserModel from "../models/registerUserModel.js";
import RevokedTokenModel from "../models/revokedTokenModel.js";

export const signOutUser = async (req, res) => {
  try {
    // If email and password are valid and belong to the same user, sign in the user
    // You can generate a JWT token here and send it back to the client
    // your token to store the token Id goes here
    // const token = req.headers.authorization; //assuming the token is passed in the authorization header
    // Store the token ID in a blacklist or revocation list (e.g., in a database or cache)
    // await new RevokedTokenModel({ token }).save();
    // return a success response
    // res.status(200).json({ message: "Sign-out Successful" });

    const user = await RegisterUserModel.findOneAndUpdate(
      {
        authToken: req.cookies.authToken,
      },
      { $unset: { authToken: 1 } },
      { new: true }
    );

    res
      .clearCookie("authToken")
      .status(200)
      .json({ message: "Sign-out Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const GetSignInUser = async (req, res) => {
  if (req.cookies.authToken) {
    // Here, you can retrieve the user information from your database or any other data source
    // For simplicity, let's assume you have a User Registeration model in your database
    const user = await RegisterUserModel.findOne({
      authToken: req.cookies.authToken,
    });
    if (user) {
      // return the user information
      return res.status(200).json({ user });
    }
  }

  // if the user is not authenticated or not found, return an error or empty response
  return res.status(401).json({ error: "user not authenticated" });
};

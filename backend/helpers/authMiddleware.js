import jwt from "jsonwebtoken";
import revokedTokenModel from "../models/revokedTokenModel";

export const authenticationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization; //extract the token from the request headers

    // check if the token exists in the revokedTokens collection
    const revokedToken = await revokedTokenModel.findOne({ token });

    if (revokedToken) {
      return res.status(401).json({ message: "Token revoked" });
    }

    // verify the token and extract the user information
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user information to the request object for further proessing
    req.user = decodedToken;

    // proceed to the next middleware or router handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

import RevokedTokenModel from "../controllers/revokedTokenModel.js";

export const revokeToken = async (req, res) => {
  try {
    const token = req.headers.authorization; //extract the token from the request headers

    // check if the token exists in the revokedTokens collection
    // i used find findOneAndUpdate instead of findOne because it reduces database queries
    const existingToken = await RevokedTokenModel.findOneAndUpdate(
      { token },
      {},
      { upsert: true, new: true }
    );

    if (existingToken) {
      return res.status(400).json({ message: "Token already revoked" });
    }

    // save the revoked token in the revokedTokens collection
    await new RevokedTokenModel({ token }).save();

    return res.status(200).json({ message: "Token revoked successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

import mongoose from "mongoose";

const RevokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("RevokedToken", RevokedTokenSchema);

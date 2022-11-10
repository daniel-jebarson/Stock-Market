import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ban: {
    type: Boolean,
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;

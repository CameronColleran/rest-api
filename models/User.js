import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: new Date(),
  },
  biography: String,
  following: [String],
  followers: [String],
});

const User = mongoose.model("User", UserSchema);

export default User;

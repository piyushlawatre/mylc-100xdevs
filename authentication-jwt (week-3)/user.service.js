import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const saltRound = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export async function signUp(user) {
  try {
    user.salt = bcrypt.genSaltSync(saltRound);
    user.password = bcrypt.hashSync(user.password, user.salt);
    const newUser = await User.create(user);
    console.log("User signed up successfully:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}

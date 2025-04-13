import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String, minlength: [2, "First name must be at least 2 characters long"], required: [true, "firstname is required"]
  },
  lastname: { type: String, minlength: [2, "Last name must be at least 2 characters long"], required: [true, "lastname is required"] },
  email: { type: String, required: [true, "email is required"], unique: true },
  password: { type: String, required: [true, "password is required"] },
  birthdate: { type: Date, required: [true, "birthdate is required"] },
  flavoriteFlatIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "flats" }],
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  createdAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.post("save", function (user, next) {
  user.password = undefined;
  next();
});

userSchema.post("find", function (users, next) {
  users.forEach(user => {
    user.password = undefined;
  });
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenHashed = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordToken = resetTokenHashed;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

export const User = mongoose.model("users", userSchema);
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

// ?Pre save hook for hashed the password:
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = bcryptjs.genSaltSync(10);
    this.password = bcryptjs.hashSync(this.password, salt);
    next();
  } catch (error) {
    console.log("Error While Hashing Password", error.message);
    next(error);
  }
});

// ?compare the password:
userSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

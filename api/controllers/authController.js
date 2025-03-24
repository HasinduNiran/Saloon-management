import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!!!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email: email.toLowerCase() });

    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Email or Password incorrect" });
    }

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
      // { expiresIn: "1h" }
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ token, user: rest });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    // Check if email is already in use by another user
    const existingUser = await User.findOne({
      email,
      _id: { $ne: id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use by another account",
      });
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run model validation
      }
    ).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      message: "Server error occurred while updating profile",
      error: error.message,
    });
  }
};

// Delete User Account
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Optional: Delete related data (appointments, bookings, etc.)
    // await Appointment.deleteMany({ userId: id });
    // await Booking.deleteMany({ userId: id });

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      message: "Server error occurred while deleting account",
      error: error.message,
    });
  }
};
export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been signed out!");
  } catch (error) {
    next(error);
  }
};

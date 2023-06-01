import RegisterUserModel from "../models/registerUserModel.js";
import { hashPassword } from "../helpers/authHelper.js";

// add a new user
export const addUser = async (req, res) => {
  try {
    const { name, email, address, password, phone, role } = req.body;

    const existingUser = await RegisterUserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, message: "user already registered" });
    }

    // get hashed password here
    const hashedPassword = await hashPassword(password);

    // saving posting data to mongodb including hashed password
    let user = await new RegisterUserModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "user added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

// get single user
export const GetSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await RegisterUserModel.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "failed to get user" });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await RegisterUserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, password, phone } = req.body;

    const updatedUser = await RegisterUserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        address,
        password,
        phone,
      },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await RegisterUserModel.findByIdAndRemove(id);

    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to delete user" });
  }
};

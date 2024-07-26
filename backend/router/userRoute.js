const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

// Create user route
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const userData = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userData);
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === 11000) { // Check if it's a duplicate key error
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the User collection
    res.status(200).json(users); // Send the list of users as JSON
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Send a 500 error response
  }
});

// Retrieve a single user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const singleUser = await User.findById(id.trim()); // Fetch the user by ID from the User collection
      if (!singleUser) {
        return res.status(404).json({ message: "User not found" }); // If user is not found, send a 404 response
      }
      res.status(200).json(singleUser); // Send the user data as JSON
    } catch (error) {
      console.error("Error fetching user:", error); // Log the error
      res.status(500).json({ message: "Internal Server Error" }); // Send a 500 error response
    }
  });
  

  router.delete("/:id", async (req, res) => {
    const {id}=req.params;
    try {
      const singleUsers = await User.findByIdAndDelete(id.trim()); // Fetch all users from the User collection
      res.status(200).json(singleUsers); // Send the list of users as JSON
    } catch (error) {
      console.error("Error fetching users:", error); // Log the error
      res.status(500).json({ message: "Internal Server Error" }); // Send a 500 error response
    }
  });

// Update a user by ID (using PATCH)
// Update a user by ID (using PATCH)
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id.trim(), // Trim the ID to remove any extraneous characters
        { name, email, age },
        { new: true, runValidators: true } // Return the updated document and run validators
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" }); // If user is not found, send a 404 response
      }
      res.status(200).json(updatedUser); // Send the updated user data as JSON
    } catch (error) {
      console.error("Error updating user:", error); // Log the error
      res.status(500).json({ message: "Internal Server Error" }); // Send a 500 error response
    }
  });
  
  

module.exports = router;

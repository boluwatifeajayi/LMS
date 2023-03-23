const express = require('express')
const router = express.Router()

// Import the user controller functions
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController.js')

// Import the auth middleware functions
const { protect, admin } = require('../middleware/authMiddleware.js');

// Define the user routes and their corresponding controller functions
router.route('/')
  .post(registerUser) // Create a new user
  .get(protect, admin, getUsers) // Get all users (only for admin)

router.post('/login', authUser) // Authenticate a user

router.route('/profile')
  .get(protect, getUserProfile) // Get the profile of the authenticated user
  .put(protect, updateUserProfile) // Update the profile of the authenticated user

router.route('/:id')
  .delete(protect, admin, deleteUser) // Delete a user (only for admin)
  .get(protect, admin, getUserById) // Get a user by ID (only for admin)
  .put(protect, admin, updateUser) // Update a user by ID (only for admin)

module.exports = router;

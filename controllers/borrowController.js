const asyncHandler = require('express-async-handler')
const Borrow = require('../models/borrowModel.js')

// Create a new borrow with the given borrow items, shipping address, payment method,
// and price details
const addBorrowItems = asyncHandler(async (req, res) => {
	const {
		borrowItems,
	} = req.body
	
	// Check if there are any borrow items
	if (!borrowItems || borrowItems.length === 0) {
		throw new Error('No borrow items')
	}
	
	// Create a new borrow object and save it to the database
	const borrow = await Borrow.create({
			user: req.user._id,
			borrowItems,
		})
	
		res.status(201).json(borrow)
	})
	
	// Get a borrow by ID and populate its user field with the name and email
const getBorrowById = asyncHandler(async (req, res) => {
		const borrow = await Borrow.findById(req.params.id).populate(
			'user',
			'firstname email'
		)
	
	if (!borrow) {
		throw new Error('Borrow not found')
	}
	
	res.json(borrow)
	})
	
// Update a borrow's isBorrowed flag and payment details

const updateBorrowToBorrowed = asyncHandler(async (req, res) => {
	const borrow = await Borrow.findById(req.params.id)
	
	if (!borrow) {
		throw new Error('Borrow not found')
	}
	
	// Update the borrow's payment details
	borrow.isBorrowed = true
	borrow.borrowedAt = Date.now()
	borrow.borrowResult = {
		id: req.body.id,
		status: req.body.status,
		update_time: req.body.update_time,
		email_address: req.body.payer.email_address,
	}
	
	const updatedBorrow = await borrow.save()
	
	res.json(updatedBorrow)
	})
	
	
// Update a borrow's isDelivered flag and deliveredAt timestamp
const updateBorrowToReturned = asyncHandler(async (req, res) => {
	const borrow = await Borrow.findByIdAndUpdate(
		req.params.id,
			{ isReturned: true, returnedAt: Date.now() },
			{ new: true }
		)
	
	if (!borrow) {
		res.status(404)
		throw new Error('Borrow not found')
	}
	
		res.json(borrow)
	})
	
// Get all borrows belonging to the logged in user
const getMyBorrows = asyncHandler(async (req, res) => {
		const borrows = await Borrow.find({ user: req.user._id })
	res.json(borrows)
})

// Get all borrows with user information populated
const getBorrows = asyncHandler(async (req, res) => {
		const borrows = await Borrow.find({}).populate('user', 'id firstname')
	res.json(borrows)
})
	
	

module.exports = {
	addBorrowItems,
	getBorrowById,
	updateBorrowToBorrowed,
	updateBorrowToReturned,
	getMyBorrows,
	getBorrows,
}



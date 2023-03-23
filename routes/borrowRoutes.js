const express = require('express')
const router = express.Router()
const {
	addBorrowItems,
	getBorrowById,
	updateBorrowToBorrowed,
	updateBorrowToReturned,
	getMyBorrows,
	getBorrows,
} = require('../controllers/borrowController.js')

const { protect, admin } = require('../middleware/authMiddleware.js');


router.route('/').post(protect, addBorrowItems).get(protect, admin, getBorrows)

router.route('/myborrows').get(protect, getMyBorrows)

router.route('/:id').get(protect, getBorrowById)

router.route('/:id/pay').put(protect, updateBorrowToBorrowed,)

router.route('/:id/deliver').put(protect, admin, updateBorrowToReturned,)

module.exports = router;
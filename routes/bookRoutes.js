const express = require('express')
const router = express.Router()
const {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
} =  require('../controllers/bookController.js')

const { protect, admin } = require('../middleware/authMiddleware.js');


router.route('/').get(getBooks).post(protect, admin, createBook)

router.route('/:id/reviews').post(protect, createBookReview)

router.get('/top', getTopBooks)

router
  .route('/:id')
  .get(getBookById)
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook)

module.exports = router;

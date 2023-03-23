const asyncHandler = require('express-async-handler')
const Book = ('../models/bookModel.js')


const getBooks = asyncHandler(async (req, res) => {
	// Set the number of items to show per page
	const pageSize = 10
	// Determine the current page number from the request, default to 1
	const page = Number(req.query.pageNumber) || 1
  
	// Set up a keyword filter for searching by book name
	const keyword = req.query.keyword
	  ? {
		  name: {
			$regex: req.query.keyword,
			$options: 'i', // Case-insensitive
		  },
		}
	  : {}
  
	// Count the total number of books matching the keyword filter
	const count = await Book.countDocuments({ ...keyword })
	// Find the books matching the keyword filter, limit by page size, and skip by page number
	const books = await Book.find({ ...keyword })
	  .limit(pageSize)
	  .skip(pageSize * (page - 1))
  
	// Send the books, current page number, and total number of pages to the client
	res.json({ books, page, pages: Math.ceil(count / pageSize) })
  })
  

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})


const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.json({ message: 'Book removed' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})


const createBook = asyncHandler(async (req, res) => {
	const book = await Book.create(req.body);
	res.status(201).json(book);
  });
  


const updateBook = asyncHandler(async (req, res) => {
	const book = await Book.findById(req.params.id)
  
	if (!book) {
	  res.status(404)
	  throw new Error('Book not found')
	}
  
	Object.assign(book, req.body)
  
	const updatedBook = await book.save()
  
	res.json(updatedBook)
  })
  

const createBookReview = asyncHandler(async (req, res) => {
	// Get the rating and comment from the request body
	const { rating, comment } = req.body
  
	// Find the book with the specified ID
	const book = await Book.findById(req.params.id)
  
	// If the book is not found, return a 404 error
	if (!book) {
	  res.status(404)
	  throw new Error('Book not found')
	}
  
	// Check if the user has already reviewed the book
	const alreadyReviewed = book.reviews.find((r) => r.user.toString() === req.user._id.toString())
  
	// If the user has already reviewed the book, throw an error
	if (alreadyReviewed) throw new Error('Book already reviewed')
  
	// Create a new review object with the user's name, rating, comment, and ID
	const review = { name: req.user.firstname, rating: Number(rating), comment, user: req.user._id }
  
	// Add the new review to the book's list of reviews
	book.reviews.push(review)
  
	// Update the book's number of reviews
	book.numReviews = book.reviews.length
  
	// Update the book's rating based on the average of all the ratings
	book.rating = book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length
  
	// Save the updated book to the database
	await book.save()
  
	// Return a success message
	res.status(201).json({ message: 'Review added' })
  })
  


const getTopBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ rating: -1 }).limit(3)

  res.json(books)
})



module.exports = {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
}
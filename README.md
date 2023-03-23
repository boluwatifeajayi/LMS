Express.js and MongoDB API Readme
This is an API built with Express.js and MongoDB that provides endpoints for managing books, borrowing items, user authentication, and image uploads.

Installation
Clone this repository
Install dependencies by running npm install
Set up environment variables by creating a .env file in the root directory and adding the following variables:


NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
Start the server by running npm start

API Endpoints
/api/users
POST - Create a new user
GET - Get all users (only for admin)
/api/users/login
POST - Authenticate a user
/api/users/profile
GET - Get the profile of the authenticated user
PUT - Update the profile of the authenticated user
/api/users/:id
DELETE - Delete a user (only for admin)
GET - Get a user by ID (only for admin)
PUT - Update a user by ID (only for admin)
/api/books
GET - Get all books
POST - Create a new book (only for admin)
/api/books/:id
GET - Get a book by ID
DELETE - Delete a book by ID (only for admin)
PUT - Update a book by ID (only for admin)
/api/books/:id/reviews
POST - Create a new review for a book
/api/books/top
GET - Get top-rated books
/api/borrow
POST - Add borrow items
GET - Get all borrow items (only for admin)
/api/borrow/myborrows
GET - Get the borrow items of the authenticated user
/api/borrow/:id
GET - Get a borrow item by ID
PUT - Update a borrow item to "borrowed"
/api/borrow/:id/deliver
PUT - Update a borrow item to "returned" (only for admin)
/api/upload
POST - Upload an image
Middleware
protect - Middleware to authenticate users
admin - Middleware to restrict access to admin users only
Error Handling
notFound - Middleware to handle 404 errors
errorHandler - Middleware to handle all other errors
Dependencies
express
dotenv
colors
morgan
path
mongoose
bcryptjs
jsonwebtoken
multer
Contributing
Contributions are welcome. Please create a pull request or open an issue to discuss potential changes.

License
This project is licensed under the MIT License.# LMS

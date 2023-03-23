const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/books', require('./routes/bookRoutes'))
app.use('/api/borrow', require('./routes/borrowRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

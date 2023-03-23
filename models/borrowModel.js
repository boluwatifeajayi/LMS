const mongoose = require('mongoose')

const borrowSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    borrowItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        id: { type: Number, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    
    
    isBorrowed: {
      type: Boolean,
      required: true,
      default: false,
    },
    borrowedAt: {
      type: Date,
    },
    borrowResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false,
    },
    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)



module.exports = mongoose.model('Borrow', borrowSchema)


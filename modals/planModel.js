const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A user must have a subscription plan!'],
  },
  price: {
    type: Number,
    require: [true, 'Plan must have a price.'],
  },
  sub: {
    type: String,
    required: [true, 'choose your subscription plan.'],
    enum: {
      values: ['freeplan', 'medium', 'pro'],
      message: 'subsription plan must be either freeplan or medium or pro.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

planSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;

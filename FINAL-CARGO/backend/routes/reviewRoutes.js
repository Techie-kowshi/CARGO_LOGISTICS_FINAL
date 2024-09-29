const express = require('express');
const Review = require('../models/review');
const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// Post a new review
router.post('/', async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json(newReview);
});

module.exports = router;

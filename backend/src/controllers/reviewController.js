const reviewController = {};

import reviewModel from "../models/Reviews.js";


//SELECT
reviewController.getReviews = async (req, res) => {
    const reviews = await reviewModel.find().populate('idClient')
    res.json(reviews);
  };


  // INSERT
  reviewController.createReview = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    const newRating = new reviewModel({comment, rating, idClient})
    await newRating.save();
    res.json({message: "reseña guardada"})
  }


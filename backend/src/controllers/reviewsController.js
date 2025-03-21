const reviewController = {};
import reviewModel from "../models/Reviews.js";

// SELECT
reviewController.getReviews = async (req, res) => {
  const reviews = await reviewModel.find().populate("idClient");
  res.json(reviews);
};

// INSERT
reviewController.insertReview = async (req, res) => {
  const { comment, rating, idClient } = req.body;
  if(rating < 1 || rating > 5) return res.json({ message: "rating must be between 1 and 5" });
  const newReview = new reviewModel({ comment, rating, idClient });
  await newReview.save();
  res.json({ message: "review saved" });
};

// DELETE
reviewController.deleteReview = async (req, res) => {
  await reviewModel.findByIdAndDelete(req.params.id);
  res.json({ message: "review deleted" });
};

// UPDATE
reviewController.updateReview = async (req, res) => {
  const { comment, rating, idClient } = req.body;
  await reviewModel.findByIdAndUpdate(
    req.params.id,
    { comment, rating, idClient },
    { new: true }
  );
  res.json({ message: "review updated" });
};

export default reviewController;

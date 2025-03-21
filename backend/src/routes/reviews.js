import express from "express";

const router = express.Router();

import reviewController from "../controllers/reviewsController.js";

router
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.insertReview);

router
  .route("/:id")
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default router;

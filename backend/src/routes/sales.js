import express from "express";
import salesController from "../controllers/salesController.js";

const router = express.Router();

router.route("/").post(salesController.insertSales);

router.route("/sales-category").get(salesController.getSalesByCategory);
router.route("/best-products").get(salesController.getBestSellingProducts);
router.route("/frequent-customer").get(salesController.getFrequentCustomer);
router.route("/total-earnings").get(salesController.totalEarnings);

export default router;

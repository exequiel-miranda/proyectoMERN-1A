import express from "express";
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";

const router = express.Router();

router.route("/requestCode").post(recoveryPasswordController.requestCode);
//router.route("/verifyCode").post();
//router.route("/newPassword").post();

export default router;

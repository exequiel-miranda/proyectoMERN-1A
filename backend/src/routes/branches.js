import express from "express";
import branchesController from "../controllers/branchesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(branchesController.getbranches)
  .post(branchesController.createbranches);

router
  .route("/:id")
  .put(branchesController.updatebranches)
  .delete(branchesController.deletebranches);

export default router;

import express from "express";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();
import codesController from "../controllers/codesControler.js";

router
  .route("/")
  .get(codesController.getCodes)
  .post(codesController.createCodes);

router
  .route("/:id")
  .put(codesController.updateCode)
  .delete(codesController.deleteCode);

export default router;

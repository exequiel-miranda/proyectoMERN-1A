import express from "express";
import providersController from "../controllers/providersController.js";
import multer from "multer";

const router = express.Router();

//configurar una carpeta en local que guarde
// el registro de las imágenes subidas
const upload = multer({dest: "public/"})

router
  .route("/")
  .get(providersController.getAllProviders)
  .post(upload.single("image"), providersController.insertProviders);

  router.route("/:id")
  .put(upload.single("image"), providersController.putProviders)

export default router;

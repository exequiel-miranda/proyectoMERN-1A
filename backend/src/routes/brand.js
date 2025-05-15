import express from "express";
import brandController from "../controllers/brandController.js";
import multer from "multer";

const router = express.Router();

//configurar una carpeta en local que guarde el registro de las imágenes subidas
const upload = multer({dest: "public/"})

router.route("/")
    .get(brandController.getAllBrand)
    .post(upload.single("image"), brandController.insertBrand);


    router.route("/:id")
    .put(upload.single("image"), brandController.putBrand)
    .delete(brandController.deleteBrand);

export default router;
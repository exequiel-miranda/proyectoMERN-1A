import brandModel from "../models/brand.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";

//1- En el controlador, siempre se tiende a configurar
//Cloudinary primero

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

//Array de funciones vacio
const brandController = {};

brandController.getAllBrand = async (req, res) => {
  const brand = await brandModel.find();
  res.json(brand);
};

//INSERT
brandController.insertBrand = async (req, res) => {
  const { name, year, slogan } = req.body;
  let imageURL = "";

  //subir la imagen a Cloudinary
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"],
    });
    imageURL = result.secure_url;
  }
  //Guardar el registro en la base de datos
  const newBrand = new brandModel({ name, year, slogan, image: imageURL });
  newBrand.save();

  res.json({ message: "brand saved" });
};

//UPDATE
brandController.putBrand = async (req, res) => {
    const { name, year, slogan } = req.body;
    let imageURL = "";
  
    //subir la imagen a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageURL = result.secure_url;
    }
    //Actualizar la base de datos
    await brandModel.findByIdAndUpdate(req.params.id, { name, year, slogan, image: imageURL }, {new: true});
  
    res.json({ message: "provider actualized" });
  };

//DELETE
brandController.deleteBrand = async (req, res) => {
    const deletedBrand = await brandModel.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: "Brand deleted" });
  };

export default brandController;
import providersModel from "../models/providers.js";
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
const providersController = {};

providersController.getAllProviders = async (req, res) => {
  const providers = await providersModel.find();
  res.json(providers);
};

//INSERT
providersController.insertProviders = async (req, res) => {
  const { name, telephone } = req.body;
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
  const newProvider = new providersModel({ name, telephone, image: imageURL });
  newProvider.save();

  res.json({ message: "provider saved" });
};

//UPDATE
providersController.putProviders = async (req, res) => {
    const { name, telephone } = req.body;
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
    await providersModel.findByIdAndUpdate(req.params.id, { name, telephone, image: imageURL }, {new: true});
    
  
    res.json({ message: "provider update" });
  };


//DELETE
providersController.deleteProviders = async (req, res) => {
    const deletedProviders = await providersModel.findByIdAndDelete(req.params.id);
    if (!deletedProviders) {
      return res.status(404).json({ message: "Providers not found" });
    }
    res.json({ message: "Providers deleted" });
  };

export default providersController;

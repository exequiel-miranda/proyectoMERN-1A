const codesController = {};
import codesModel from "../models/Codes.js";

// Select

codesController.getCodes = async (req, res) => {
  const Codes = await codesModel.find();
  res.json(Codes);
};

// INSERT
codesController.createCodes = async (req, res) => {
  const { name, tipo, fecha } = req.body;
  const newCode = new codesModel({ name, tipo, fecha });
  await newCode.save();
  res.json({ message: "codigo guardado" });
};

//Eliminar
codesController.deleteCode = async (req, res) => {
  await codesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "producto eliminado" });
};

//Actualizar
codesController.updateCode = async (req, res) => {
  const { name, tipo, fecha } = req.body;
  const codeUpdated = await codesModel.findByIdAndUpdate(
    req.params.id,
    { name, tipo, fecha },
    { new: true }
  );
  res.json({ message: "producto actualizado" });
};

export default codesController;

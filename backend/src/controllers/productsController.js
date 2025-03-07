// Aqui en el controlador, irán todos los metodos
// (C R U D)

const productsController = {};
import productsModel from "../models/Products.js";

// SELECT
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// INSERT
productsController.createProducts = async (req, res) => {
  const { name, description, price, stock } = req.body;

  const newProduct = new productsModel({ name, description, price, stock });

  await newProduct.save();
  res.json({ message: "Producto guardado" });
};

// DELETE
productsController.deleteProducts = async (req, res) => {
  const deleteProduct = await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Producto eliminado" });
};

// UPDATE
productsController.updateProducts = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const updatedProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    { name, description, price, stock },
    { new: true }
  );

  res.json({ message: "producto actualizado" });
};

// SELECT 1 PRODUCT BY ID
productsController.getProduct = async (req, res) => {
  const product = await productsModel.findById(req.params.id);
  res.json(product);
};

export default productsController;

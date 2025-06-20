import salesModel from "../models/sales.js";

//Array de funciones
const salesController = {};

// =======================
//  VENTAS POR CATEGORIA
// =======================
salesController.getSalesByCategory = async (req, res) => {
  try {
    const resultado = await salesModel.aggregate([
      {
        $group: {
          _id: "$category",
          totalVentas: { $sum: "$total" },
        },
      },
      //ordenar los resultados
      {
        $sort: { totalVentas: -1 },
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "internal server error" });
  }
};

// ========================
// PRODUCTOS MAS VENDIDOS
// ========================

salesController.getBestSellingProducts = async (req, res) => {
  try {
    const resultado = await salesModel.aggregate([
      {
        $group: {
          _id: "$product",
          cantidadVentas: { $sum: 1 },
        },
      },
      //ordenar
      {
        $sort: { cantidadVentas: -1 },
      },
      //limitar la cantidad de datos a mostrar
      {
        $limit: 5,
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========================
// CLIENTE CON MÁS COMPRAS
// =========================

salesController.getFrequentCustomer = async (req, res) => {
  try {
    const resultado = await salesModel.aggregate([
      {
        $group: {
          _id: "$customer",
          comprasRealizadas: { $sum: 1 },
        },
      },
      //ordenar
      {
        $sort: { comprasRealizadas: -1 },
      },
      //limitar
      {
        $limit: 3,
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ====================
// GANANCIAS TOTALES
//=====================

salesController.totalEarnings = async (req, res) => {
  try {
    const resultado = await salesModel.aggregate([
      {
        $group: {
          _id: null,
          gananciasTotales: { $sum: "$total" },
        },
      },
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "internal server error" });
  }
};

// ===================
// VENTAS POR FECHA
// ===================

salesController.getSalesByDate = async (req, res) => {
  try {
    const resultado = await salesModel.aggregate([
      {
        $group: {
          _id: {
            anio: { $year: "$fecha" },
            mes: { $month: "$fecha" },
          },
          totalVentas: { $sum: "$total" },
        },
      },
      //ordenar
      {
        $sort: { totalVentas: -1 },
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Insertar ventas
salesController.insertSales = async (req, res) => {
  try {
    const { product, category, customer, total, date } = req.body;
    const newSale = new salesModel({
      product,
      category,
      customer,
      total,
      date,
    });
    await newSale.save();

    res.status(200).json({ message: "Sales saved" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default salesController;

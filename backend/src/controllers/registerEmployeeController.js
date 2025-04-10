// Importamos el modelo de la base de datos
import employeeModel from "../models/employee.js";
// Importamos librerias
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

// Cremos un array de funciones
const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  // pedimos los campos que vamos a registrar
  const {
    name,
    lastName,
    email,
    address,
    password,
    hireDate,
    telephone,
    dui,
    isVerified,
    issnumber,
  } = req.body;

  try {
    // Verificamos si el empleado ya existe
    const employeeExist = await employeeModel.findOne({ email });
    if (employeeExist) {
      return res.json({ message: "Employee already exist" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardamos el empleado en la base de datos
    const newEmployee = new employeeModel({
      name,
      lastName,
      email,
      address,
      password: passwordHash,
      hireDate,
      telephone,
      dui,
      isVerified,
      issnumber,
    });

    await newEmployee.save();

    // TOKEN
    jsonwebtoken.sign(
      //1- Que voy a guardar
      { id: newEmployee._id },
      //2- secreto
      config.JWT.secret,
      //3- Cuando expira
      { expiresIn: config.JWT.expires },
      //4- funcion flecha
      (error, token) => {
        if (error) console.log("error");

        res.cookie("authToken", token);
        res.json({ message: "Employee registed" });
      }
    );
    
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" });
  }
};

export default registerEmployeeController;

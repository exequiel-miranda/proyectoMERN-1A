import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import clientsModel from "../models/customers.js";
import employeeModel from "../models/employee.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js";
import { config } from "../config.js";

//1- Array de funciones
const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    //Verificamos que el usuario exista
    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeeModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Generar un codigo aleatorio (el que vamos a mandar)
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    // Guardar todo en un token
    const token = jsonwebtoken.sign(
      //1-¿que voy a guardar?
      { email, code, userType, verified: false },
      //2- secret key
      config.JWT.secret,
      //3-¿Cuando expira?
      { expiresIn: "20m" }
    );

    //Guardamos el token en una cookie
    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    //ULTIMO PASO - Enviar el correo
    await sendEmail(
      email,
      "Password recovery code",
      `Your verification code is: ${code}`,
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "Verification code sent" });
  } catch (error) {
    console.log("error" + error);
  }
};

//VERIFICAR CODIGO
recoveryPasswordController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    //Obtenemos el token
    const token = req.cookies.tokenRecoveryCode;
    //Extraer el código del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    //Comparar 1 el codigo que el usuario escribe
    // con el codigo que tengo guardado en el token
    if (decoded.code !== code) {
      return res.json({ message: "Invalid code" });
    }

    const newToken = jsonwebtoken.sign(
      //1- ¿Que vamos a guardar?
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      //2-secret key
      config.JWT.secret,
      //3-¿cuando expira?
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });

    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default recoveryPasswordController;

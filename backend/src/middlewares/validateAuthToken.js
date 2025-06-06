import jsonwebtoken from "jsonwebtoken";

import { config } from "../config.js";

export const validateAuthToken = (allowedUserTypes = []) => {
  return (req, res, next) => {
    try {
      //1- Extraer el token de las cookies
      const { authToken } = req.cookies;

      //2- Imprimir un mensaje de error si no hay cookies
      if (!authToken) {
        return res.json({ message: "No auth token found, you must login" });
      }

      //3- Extraer la información del token
      const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);

      //4-Verificar si quien inició sesión es un usuario permitido
      if (!allowedUserTypes.includes(decoded.userType)) {
        return res.json({ message: "Access denied" });
      }

      next();
    } catch (error) {
        console.log("error"+error)
    }
  };
};

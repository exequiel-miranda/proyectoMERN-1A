// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewRoutes from "./src/routes/reviews.js";
import registerEmployeesRoutes from "./src/routes/registerEmployee.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registerClientsRouter from "./src/routes/registerClients.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import providersRoutes from "./src/routes/providers.js";
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
import faqsRoutes from "./src/routes/faqs.js";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
// Para que postman guarde el token en una cookie
app.use(cookieParser());

//Traemos el archivo json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./docEPAv2.json"), "utf-8")
);

//Mostramos el archivo al ingresar a /api/docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/registerEmployee", registerEmployeesRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

app.use("/api/registerClients", registerClientsRouter);

app.use("/api/RecoveryPassword", recoveryPasswordRoutes);

app.use("/api/providers", providersRoutes);

app.use("/api/faqs", faqsRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;

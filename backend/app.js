// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewRoutes from "./src/routes/reviews.js";
import registerEmployeesRoutes from "./src/routes/registerEmployee.js"
import cookieParser from "cookie-parser";


// Creo una constante que es igual a la libreria que importé
const app = express();
//s
//Que acepte datos en json
app.use(express.json());
// Para que postman guarde el token en una cookie
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/registerEmployee", registerEmployeesRoutes)

// Exporto la constante para poder usar express en otros archivos
export default app;

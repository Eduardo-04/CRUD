import dotenv from "dotenv";
import express from "express";
import productosRouter from "./routers/productos.routers"; // Importa el router de productos

dotenv.config({ path: "/home/taller4N/productos/src/.env" });

const app = express();
const port = process.env.PORT || 3001;

// Middleware para parsear JSON
app.use(express.json());

// Usa el router de productos
app.use("/productos", productosRouter);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("Hola Productos");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación de productos corriendo en: http://localhost:${port}`);
});
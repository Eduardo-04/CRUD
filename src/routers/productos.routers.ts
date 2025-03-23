import { Router } from "express";
import {
  getAll,
  addProducto,
  updateProduct,
  deleteProduct,
} from "../controllers/productos.controller";

const ruta = Router();

// Ruta para obtener todos los productos (desde la base de datos)
ruta.get("/all", getAll);

// Ruta alternativa para obtener todos los productos (desde la base de datos)
ruta.get("/db", getAll);

// Ruta para agregar un nuevo producto (Método POST)
ruta.post("/all", addProducto);

// Ruta para actualizar un producto por ID (Método PUT)
ruta.put("/:id", updateProduct);

// Ruta para eliminar un producto por ID (Método DELETE)
ruta.delete("/:id", deleteProduct);

export default ruta;
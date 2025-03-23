import { Request, Response } from "express";
import connection from "../models/DB";
import { ResultSetHeader } from "mysql2";

// Obtener todos los productos
export const getAll = async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query("SELECT * FROM productos");
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Crear un nuevo producto
export const addProducto = async (req: Request, res: Response) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos obligatorios: nombre, precio",
    });
  }

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
      [nombre, precio]
    );

    res.status(201).json({
      success: true,
      message: "Producto agregado exitosamente",
      productoId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al agregar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos obligatorios: nombre, precio",
    });
  }

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
      [nombre, precio, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
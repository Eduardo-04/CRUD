import mysql from "mysql2/promise";

// Configuración de la base de datos
const config = {
  host: "localhost",          
  user: "root",               
  password: "eduardo",        
  database: "Taller4",        
  port: 3306,                
};

// Crear un pool de conexiones
const connection = mysql.createPool(config);

// Verificar la conexión
connection
  .getConnection()
  .then(() => {
    console.log("Conexión a MySQL establecida correctamente.");
  })
  .catch((error) => {
    console.error("Error al conectar a MySQL:", error.message);
  });

export default connection;
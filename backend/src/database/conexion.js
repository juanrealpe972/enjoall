import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, "../env/.env") });

// Crear un pool de conexiones a la base de datos
export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

// Función para validar la conexión a la base de datos
async function validateConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión a base de datos exitosa.");
        connection.release(); // Liberar la conexión
    } catch (error) {
        console.error("Conexión a base de datos fallida:", error.message);
    }
}

validateConnection();
// Importar los paquetes necesarios
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear una instancia de Express
const app = express();

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para parsear el body de las solicitudes (JSON)
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',    // Cambia esto según tu configuración
  user: 'root',         // Cambia esto según tu configuración
  password: '1234',         // Cambia esto según tu configuración
  database: 'cotizador_db'  // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para realizar una cotización
app.post('/api/cotizar', (req, res) => {
  // Obtener los datos del body de la solicitud
  const { numPasajeros, lugarIda, lugarRegreso, temporada } = req.body;

  // Consulta SQL para obtener el vehículo disponible y el precio base
  const query = `
    SELECT v.tipo_vehiculo, v.capacidad_vehiculo, p.precio_base
    FROM vehiculos v
    JOIN precios p ON v.id_vehiculo = p.id_vehiculo
    WHERE p.id_municipio_ida = ?
    AND p.id_municipio_regreso = ?
    AND v.capacidad_vehiculo >= ?
    AND p.temporada = ?
  `;

  // Ejecutar la consulta en la base de datos
  connection.query(query, [lugarIda, lugarRegreso, numPasajeros, temporada], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ message: 'Error en la consulta' });
    }
    
    // Verificar si se encontraron resultados
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron vehículos disponibles para los criterios ingresados.' });
    }

    // Enviar los resultados como respuesta JSON
    res.json({ vehiculos: results });
  });
});

// Puerto en el que el servidor va a escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

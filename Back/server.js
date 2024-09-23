const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Importar el paquete MySQL
const app = express();

app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',  // O el host de tu servidor de base de datos
  user: 'root', // Usuario de MySQL
  password: 'root', // Contraseña de MySQL
  database: 'cotizador_db'  // Nombre de tu base de datos creada en MySQL Workbench
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Definir rutas de API
app.post('/api/cotizar', (req, res) => {
  const { numPasajeros } = req.body;

  // Consulta SQL para obtener los vehículos disponibles según el número de pasajeros
  const query = 'SELECT * FROM vehiculos WHERE capacidad >= ?';

  // Ejecutar la consulta
  connection.query(query, [numPasajeros], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta: ', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json({ vehiculos: results });
  });
});

// Iniciar el servidor
app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));
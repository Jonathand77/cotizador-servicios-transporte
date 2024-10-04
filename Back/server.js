const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); // Importar el paquete MySQL
const app = express();

app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost", // O el host de tu servidor de base de datos
  user: "root", // Usuario de MySQL
  password: "root", // Contraseña de MySQL
  database: "cotizador_viajes", // Nombre de tu base de datos creada en MySQL Workbench
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos: ", err.stack);
    return;
  }
  console.log("Conexión a la base de datos MySQL exitosa");
});

// Agrega este nuevo endpoint para obtener los destinos
app.get("/api/destinos", (req, res) => {
  const query = "SELECT * FROM destinos";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener destinos: ", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ destinos: results });
  });
});

// Modifica tu endpoint para cotizar
app.post("/api/cotizar", (req, res) => {
  const { numPasajeros, lugarIda } = req.body;
  console.log('Número de pasajeros:', numPasajeros);
  console.log('Lugar de ida:', lugarIda);

  // Consulta SQL para obtener los vehículos disponibles según el número de pasajeros y destino
  const query = `
    SELECT v.id, v.tipo, v.capacidad, dv.valor AS valor_base_un_dia, m.nombre AS destino
    FROM vehiculos v
    JOIN valores_base dv ON dv.vehiculo_id = v.id
    JOIN destinos m ON m.id = dv.destino_id
    WHERE v.capacidad >= ? AND m.id = ?
  `;

  // Ejecutar la consulta
  connection.query(query, [numPasajeros, lugarIda], (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta: ", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    //console.log('Resultados obtenidos: ', results);
    res.json({ vehiculos: results });
  });
});

// Iniciar el servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));

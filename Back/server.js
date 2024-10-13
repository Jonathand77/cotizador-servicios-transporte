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
  database: "base_cotizador", // Nombre de tu base de datos creada en MySQL Workbench
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

// Endpoint para cotizar
app.post("/api/cotizar", (req, res) => {
  const { numPasajeros, lugarSalida, destino, noches } = req.body;
  console.log("Número de pasajeros:", numPasajeros);
  console.log("Lugar de salida:", lugarSalida);
  console.log("Destino:", destino);
  console.log("Número de noches:", noches); // Para depuración

  const ID_MEDELLIN = 2;

  // Definir la consulta SQL
  let query = `
    SELECT v.id, v.tipo, v.capacidad, dv.valor AS valor_base_un_dia, m.nombre AS destino
    FROM vehiculos v
    JOIN valores_base dv ON dv.vehiculo_id = v.id
    JOIN destinos m ON m.id = dv.destino_id
    WHERE m.id = ?
  `;
  let queryParams = [destino];

  if (numPasajeros <= 40) {
    query += " AND v.capacidad >= ?";
    queryParams.push(numPasajeros);
  }

  // Ejecutar la consulta para obtener vehículos para el destino
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta: ", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (lugarSalida === ID_MEDELLIN && noches === 1) {
      const adjustedResults = results.map((vehiculo) => {
        const valorBase = parseFloat(vehiculo.valor_base_un_dia);
        return {
          ...vehiculo,
          valor_base_un_dia: `${valorBase * 1.5}`,
        };
      });
      return res.json({ vehiculos: adjustedResults });
    } else {
      const querySalida = `
        SELECT v.id, dv.valor AS valor_base_un_dia
        FROM vehiculos v
        JOIN valores_base dv ON dv.vehiculo_id = v.id
        WHERE dv.destino_id = ?
      `;

      // Si no es Medellín o si la lógica es diferente
      connection.query(querySalida, [lugarSalida], (err, resultsSalida) => {
        if (err) {
          console.error("Error ejecutando la consulta de salida: ", err);
          return res.status(500).json({ error: "Error en el servidor" });
        }

        const vehiculos = results.map((vehiculo) => {
          const valorDestino = parseFloat(vehiculo.valor_base_un_dia);
          const salidaVehiculo = resultsSalida.find(
            (v) => v.id === vehiculo.id
          );
          const valorSalida = salidaVehiculo
            ? parseFloat(salidaVehiculo.valor_base_un_dia)
            : 0;

          const valorTotal =
            lugarSalida !== ID_MEDELLIN && noches === 1
              ? (valorSalida * 1.4 + valorDestino) * 1.5
              : valorSalida * 0.4 + valorSalida + valorDestino;

          return {
            ...vehiculo,
            valor_base_un_dia: `${valorTotal}`,
          };
        });

        return res.json({ vehiculos });
      });
    }
  });
});

// Iniciar el servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));

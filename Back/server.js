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

// Un endpoint POST: Body, Params, Query

// http://localhost:5000/api/cotizar/3
// 3 --> Es un parámetro
// http://localhost:5000/api/cotizar?numPasajeros=20&lugarSalida=1&destino=2
// numPasajeros=20&lugarSalida=1&destino=2 --> Query
// numPasajeros=20
// lugarSalida=1
// destino=2

// Endpoint para cotizar
app.post("/api/cotizar", (req, res) => {
  const { numPasajeros, lugarSalida, destino } = req.body;
  console.log("Número de pasajeros:", numPasajeros);
  console.log("Lugar de salida:", lugarSalida);
  console.log("Destino:", destino);

  const ID_MEDELLIN = 2;

  // Opción 1: Cotización sale desde medellín
  // Definir la consulta SQL
  let query;
  let queryParamsDestino;
  let queryParamsSalida;

  // Si el número de pasajeros es mayor a 40, seleccionar todos los vehículos
  if (numPasajeros > 40) {
    query = `
      SELECT v.id, v.tipo, v.capacidad, dv.valor AS valor_base_un_dia, m.nombre AS destino
      FROM vehiculos v
      JOIN valores_base dv ON dv.vehiculo_id = v.id
      JOIN destinos m ON m.id = dv.destino_id
      WHERE m.id = ?
    `;
    queryParamsDestino = [destino];
    queryParamsSalida = [lugarSalida];
  } else {
    // Si el número de pasajeros es menor o igual a 40, aplicar la restricción de capacidad
    query = `
      SELECT v.id, v.tipo, v.capacidad, dv.valor AS valor_base_un_dia, m.nombre AS destino
      FROM vehiculos v
      JOIN valores_base dv ON dv.vehiculo_id = v.id
      JOIN destinos m ON m.id = dv.destino_id
      WHERE v.capacidad >= ? AND m.id = ?
    `;
    queryParamsDestino = [numPasajeros, destino];
    queryParamsSalida = [numPasajeros, lugarSalida];
  }

  // Ejecutar la consulta SQL
  connection.query(query, queryParamsDestino, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta: ", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (lugarSalida === ID_MEDELLIN) {
      // Devolver los vehículos disponibles
      res.json({ vehiculos: results });
      return;
    }

    // Si el lugar de salida no es medellín, calcular el valor total
    connection.query(query, queryParamsSalida, (err, resultsSalida) => {
      if (err) {
        console.error("Error ejecutando la consulta: ", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      const vehiculos = results.map((vehiculo) => {
        const valorDestino = parseFloat(vehiculo.valor_base_un_dia);

        let valorSalida = resultsSalida.find(
          (v) => v.id === vehiculo.id
        ).valor_base_un_dia;

        valorSalida = parseFloat(valorSalida);

        const valorTotal = valorSalida * 0.4 + valorSalida + valorDestino;

        return {
          ...vehiculo,
          valor_base_un_dia: `${valorTotal}`,
        };
      });

      // Devolver el valor total
      res.json({ vehiculos });
    });
  });
});

// Iniciar el servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));

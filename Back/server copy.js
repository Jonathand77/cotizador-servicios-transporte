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
  
  if (lugarSalida === ID_MEDELLIN) {
    // Opción 1: Cotización sale desde medellín
    // Definir la consulta SQL
    let query;
    let queryParams;

    // Si el número de pasajeros es mayor a 40, seleccionar todos los vehículos
    if (numPasajeros > 40) {
      query = `
      SELECT v.id, v.tipo, v.capacidad, dv.valor AS valor_base_un_dia, m.nombre AS destino
      FROM vehiculos v
      JOIN valores_base dv ON dv.vehiculo_id = v.id
      JOIN destinos m ON m.id = dv.destino_id
      WHERE m.id = ?
    `;
      queryParams = [destino];
    } else {
      // Si el número de pasajeros es menor o igual a 40, aplicar la restricción de capacidad
      query = `
      SELECT v.id, v.tipo, v.capacidad, dv.valor AS valor_base_un_dia, m.nombre AS destino
      FROM vehiculos v
      JOIN valores_base dv ON dv.vehiculo_id = v.id
      JOIN destinos m ON m.id = dv.destino_id
      WHERE v.capacidad >= ? AND m.id = ?
    `;
      queryParams = [numPasajeros, destino];
    }

    // Ejecutar la consulta SQL
    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error ejecutando la consulta: ", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      const vehiculos = results.map((vehiculo) => ({
        id: vehiculo.id,
        tipo: vehiculo.tipo,
        capacidad: vehiculo.capacidad,
        valor_base_un_dia: vehiculo.valor_base_un_dia * numPasajeros,
        destino: vehiculo.destino,
      }));

      // Devolver los vehículos disponibles
      res.json({ vehiculos: results });
    });
  } else {
    // Opción 2: Cotización sale desde otro lugar que no es medellín

    // Definir la consulta SQL para obtener el valor del lugar de salida
    const query = `
      SELECT dv.valor
      FROM destinos d
      JOIN valores_base dv ON dv.destino_id = d.id
      WHERE d.id = ?
    ` 
    
    const queryParamsSalida = [lugarSalida];
    const queryParamsDestino = [destino];

    let valorSalida;
    let valorDestino;

    // Promise.all([promesa1, promesa2, promesa3]).then((resultados) => {})

    connection.query(query, queryParamsSalida, (err, results) => {
      if (err) {
        console.error("Error ejecutando la consulta: ", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      
      const valorSalida = parseFloat(results[0].valor);

      connection.query(query, queryParamsDestino, (err, results) => {
        if (err) {
          console.error("Error ejecutando la consulta: ", err);
          return res.status(500).json({ error: "Error en el servidor" });
        }

        const valorDestino = parseFloat(results[0].valor);

        // Aplican la formula de valor total = (valor lugar de salida * 0.4) + valor de salida + valor destino 
        const valorTotal = (valorSalida * 0.4) + valorSalida + valorDestino;
         
        res.json({ valorTotal, valorSalida, valorDestino });

      });
    }
  );
  }
});




// Iniciar el servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));

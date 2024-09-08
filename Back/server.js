const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/cotizador', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.log(err));

const vehiculosDisponibles = [
  { tipo: 'Camioneta', capacidad: 7 },
  { tipo: 'Busetica', capacidad: 14 },
  { tipo: 'Buseta', capacidad: 25 },
  { tipo: 'Busetón', capacidad: 35 },
  { tipo: 'Van', capacidad: 10 }
];

const cotizacionSchema = new mongoose.Schema({
  fechaIda: Date,
  lugarIda: String,
  horaIda: String,
  fechaRegreso: Date,
  lugarRegreso: String,
  horaRegreso: String,
  temporada: String,
  numPasajeros: Number
});

const Cotizacion = mongoose.model('Cotizacion', cotizacionSchema);

app.post('/api/cotizar', async (req, res) => {
  const { numPasajeros } = req.body;

  // Filtra los vehículos según el número de pasajeros
  const vehiculosFiltrados = vehiculosDisponibles.filter(v => v.capacidad >= numPasajeros);

  const nuevaCotizacion = new Cotizacion(req.body);
  await nuevaCotizacion.save();

  res.json({
    mensaje: 'Cotización registrada con éxito',
    vehiculos: vehiculosFiltrados
  });
});

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));

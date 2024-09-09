import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const FormCotizacion = () => {
  const [formData, setFormData] = useState({
    fechaIda: '',
    lugarIda: '',
    horaIda: '',
    fechaRegreso: '',
    lugarRegreso: '',
    horaRegreso: '',
    temporada: 'Baja',
    numPasajeros: 1
  });
  
  const [vehiculos, setVehiculos] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/cotizar', formData);
      setVehiculos(res.data.vehiculos);
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center mb-4">Cotización de Transporte Especial</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="fechaIda">
                <Form.Label>Fecha de Ida</Form.Label>
                <Form.Control 
                  type="date" 
                  name="fechaIda" 
                  value={formData.fechaIda} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="horaIda">
                <Form.Label>Hora de Ida</Form.Label>
                <Form.Control 
                  type="time" 
                  name="horaIda" 
                  value={formData.horaIda} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="lugarIda">
                <Form.Label>Lugar de Ida</Form.Label>
                <Form.Control 
                  as="select" 
                  name="lugarIda" 
                  value={formData.lugarIda} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Selecciona un lugar de ida</option>
                  <option value="Municipio 1">ANTIOQUIA TROPICAL CLUB BARBOSA</option>
                  <option value="Municipio 2">ALTO PALMAS</option>
                  <option value="Municipio 2">BARBOSA</option>
                  <option value="Municipio 2">BELLO</option>
                  <option value="Municipio 2">CALDAS</option>
                  <option value="Municipio 2">HATILLO</option>
                  <option value="Municipio 2">SAN ANTONIO DE PRADO</option>
                  <option value="Municipio 2">SAN CRISTOBAL</option>
                  <option value="Municipio 2">CAUCA VIEJO</option>
                  <option value="Municipio 2">COMFAMA BALLENITAS COPACABANA</option>
                  <option value="Municipio 2">COMFAMA LA ESTRELLA</option>
                  <option value="Municipio 2">COMFAMA GUATAPE</option>
                  <option value="Municipio 2">COMFAMA RIONEGRO</option>
                  <option value="Municipio 2">COMFENALCO FARALLONES</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="temporada">
                <Form.Label>Temporada</Form.Label>
                <Form.Control 
                  as="select" 
                  name="temporada" 
                  value={formData.temporada} 
                  onChange={handleChange} 
                  required
                >
                  <option value="Baja">Baja</option>
                  <option value="Alta">Alta</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="fechaRegreso">
                <Form.Label>Fecha de Regreso</Form.Label>
                <Form.Control 
                  type="date" 
                  name="fechaRegreso" 
                  value={formData.fechaRegreso} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="horaRegreso">
                <Form.Label>Hora de Regreso</Form.Label>
                <Form.Control 
                  type="time" 
                  name="horaRegreso" 
                  value={formData.horaRegreso} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="lugarRegreso">
                <Form.Label>Lugar de Regreso</Form.Label>
                <Form.Control 
                  as="select" 
                  name="lugarRegreso" 
                  value={formData.lugarRegreso} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Selecciona un lugar de regreso</option>
                  <option value="Municipio 1">ANTIOQUIA TROPICAL CLUB BARBOSA</option>
                  <option value="Municipio 2">ALTO PALMAS</option>
                  <option value="Municipio 2">BARBOSA</option>
                  <option value="Municipio 2">BELLO</option>
                  <option value="Municipio 2">CALDAS</option>
                  <option value="Municipio 2">HATILLO</option>
                  <option value="Municipio 2">SAN ANTONIO DE PRADO</option>
                  <option value="Municipio 2">SAN CRISTOBAL</option>
                  <option value="Municipio 2">CAUCA VIEJO</option>
                  <option value="Municipio 2">COMFAMA BALLENITAS COPACABANA</option>
                  <option value="Municipio 2">COMFAMA LA ESTRELLA</option>
                  <option value="Municipio 2">COMFAMA GUATAPE</option>
                  <option value="Municipio 2">COMFAMA RIONEGRO</option>
                  <option value="Municipio 2">COMFENALCO FARALLONES</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="numPasajeros">
                <Form.Label>Número de Pasajeros</Form.Label>
                <Form.Control 
                  type="number" 
                  name="numPasajeros" 
                  value={formData.numPasajeros} 
                  onChange={handleChange} 
                  min="1" 
                  required 
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3 w-100">
            Cotizar
          </Button>
        </Form>

        <div className="mt-4">
          <h3>Vehículos Disponibles</h3>
          <ListGroup>
            {vehiculos.length > 0 ? (
              vehiculos.map((vehiculo, index) => (
                <ListGroup.Item key={index}>
                  {vehiculo.tipo} - Capacidad: {vehiculo.capacidad} pasajeros
                </ListGroup.Item>
              ))
            ) : (
              <p>No hay vehículos disponibles para la cantidad de pasajeros ingresada.</p>
            )}
          </ListGroup>
        </div>
      </Card>
    </Container>
  );
};

export default FormCotizacion;

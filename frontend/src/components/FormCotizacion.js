import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Alert, // Importar el componente Alert para mostrar mensajes
} from "react-bootstrap";

const FormCotizacion = () => {
  const [formData, setFormData] = useState({
    fechaIda: "",
    lugarIda: "",
    horaIda: "",
    fechaRegreso: "",
    lugarRegreso: "",
    horaRegreso: "",
    temporada: "Baja",
    numPasajeros: 1,
  });

  const [vehiculos, setVehiculos] = useState([]);
  //const [municipios, setMunicipios] = useState([]);
  const [valorBase, setValorBase] = useState(null);
  const [destinos, setDestinos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [avisoPasajeros, setAvisoPasajeros] = useState(false); // Estado para mostrar aviso de pasajeros


  // Obtener los destinos al cargar el componente
  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/destinos");
        setDestinos(res.data.destinos); // Guardar destinos en lugar de municipios
      } catch (error) {
        console.error("Error al obtener los destinos", error);
      }
    };

    fetchDestinos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que la fecha de regreso no sea menor a la fecha de ida
    if (formData.fechaRegreso < formData.fechaIda) {
      setErrorMessage(
        "La fecha de regreso no puede ser menor a la fecha de ida."
      );
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cotizar",
        formData
      );
      setVehiculos(res.data.vehiculos);
      if (res.data.vehiculos.length > 0) {
        setValorBase(res.data.vehiculos[0].valor_base_un_dia); // Asignar el valor base del destino
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      setLoading(false); // Finalizar loading
      setErrorMessage(
        "Error al obtener los vehículos disponibles. Intente nuevamente."
      );
    }

    // Convertir fechas y horas para comparar
    const fechaIda = new Date(`${formData.fechaIda}T${formData.horaIda}`);
    const fechaRegreso = new Date(
      `${formData.fechaRegreso}T${formData.horaRegreso}`
    );

    // Validar si la fecha de regreso es el mismo día y la hora de regreso es menor a la de ida
    if (
      formData.fechaIda === formData.fechaRegreso &&
      fechaRegreso <= fechaIda
    ) {
      setErrorMessage(
        "La hora de regreso no puede ser menor o igual a la hora de ida si es el mismo día."
      );
      return;
    }

    setLoading(true);
    setAvisoPasajeros(false); // Resetear el mensaje de advertencia

    // Verificar si el número de pasajeros es mayor a 40
    if (formData.numPasajeros > 40) {
      setAvisoPasajeros(true); // Mostrar el aviso si supera 40 pasajeros
    }

    // Si la validación pasa, procedemos con la solicitud
    try {
      setErrorMessage(""); // Limpiar mensajes de error
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/cotizar",
        formData
      );
      setVehiculos(res.data.vehiculos);
      if (res.data.vehiculos.length > 0) {
        setValorBase(res.data.vehiculos[0].valor_base_un_dia); // Asignar el valor base del destino
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      setErrorMessage(
        "Error al obtener los vehículos disponibles. Intente nuevamente."
      );
    } finally {
      setLoading(false);
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
                <Form.Label>Destino</Form.Label>
                <Form.Control
                  as="select"
                  name="lugarIda"
                  value={formData.lugarIda}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un lugar de ida</option>
                  {destinos.map(
                    (
                      destino // Cambiar de municipios a destinos
                    ) => (
                      <option key={destino.id} value={destino.id}>
                        {destino.nombre}
                      </option>
                    )
                  )}
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
                  min={formData.fechaIda} // Establecer la fecha mínima para el regreso
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
                  min={
                    formData.fechaIda === formData.fechaRegreso
                      ? formData.horaIda // Si es el mismo día, la hora mínima de regreso será la de ida
                      : null // De lo contrario, no hay restricción
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="lugarRegreso">
                <Form.Label>Lugar de salida</Form.Label>
                <Form.Control
                  as="select"
                  name="lugarRegreso"
                  value={formData.lugarRegreso}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un lugar de regreso</option>
                  {destinos.map(
                    (
                      destino // Cambiar de municipios a destinos
                    ) => (
                      <option key={destino.id} value={destino.id}>
                        {destino.nombre}
                      </option>
                    )
                  )}
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          {/* Mostrar aviso si supera los 40 pasajeros */}
          {avisoPasajeros && (
            <Alert variant="warning" className="mt-2">
              Requerirá más de un vehículo.
            </Alert>
          )}

          <Button
            variant="primary"
            type="submit"
            className="mt-3 w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cotizar Viaje"}
          </Button>
        </Form>

        <div className="mt-4">
          <h3>Vehículos Disponibles</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <ListGroup>
            {vehiculos.length > 0 ? (
              vehiculos.map((vehiculo, index) => (
                <ListGroup.Item key={index}>
                  {vehiculo.tipo} - Capacidad: {vehiculo.capacidad} pasajeros -
                  Precio: ${vehiculo.valor_base_un_dia}
                </ListGroup.Item>
              ))
            ) : (
              <p>
                No hay vehículos disponibles para la cantidad de pasajeros
                ingresada.
              </p>
            )}
          </ListGroup>
        </div>
      </Card>
    </Container>
  );
};

export default FormCotizacion;

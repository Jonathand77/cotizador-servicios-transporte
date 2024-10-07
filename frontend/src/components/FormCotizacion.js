import React, { useState, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { AiOutlineSend } from "react-icons/ai";
import Buseton from "../assets/img/BusetonOpcion1.jpeg";
import Bus from "../assets/img/Bus.jpg";
import Buseta from "../assets/img/Buseta.jpeg";
import Mercedes from "../assets/img/Van.jpeg";
import Micronissan from "../assets/img/MicroNissan.jpeg";
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
    lugarSalida: "",
    horaIda: "",
    fechaRegreso: "",
    destino: "",
    horaRegreso: "",
    temporada: "Baja",
    numPasajeros: 1,
  });

  const [vehiculos, setVehiculos] = useState([]);
  //const [municipios, setMunicipios] = useState([]);
  const [valorBase, setValorBase] = useState(null);
  const [destinos, setDestinos] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avisoPasajeros, setAvisoPasajeros] = useState(false); // Estado para mostrar aviso de pasajeros

  const imagenesVehiculos = {
    BUSETON: Buseton,
    BUS: Bus,
    BUSETA: Buseta,
    MERCEDES: Mercedes,
    MICRO_NISSAN_URVAN_ESCOLAR: Micronissan,
  };

  // Obtener destinos según el lugar de salida
  useEffect(() => {
    const fetchDestinos = async (lugarSalida) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/destinos`, {
          params: { lugarSalida },
        });
        setDestinos(res.data.destinos); // Guardar destinos
      } catch (error) {
        console.error("Error al obtener los destinos", error);
      }
    };

    if (formData.lugarSalida) {
      fetchDestinos(formData.lugarSalida);
    } else {
      setDestinos([]); // Resetea los destinos si no hay lugar de salida
    }
    fetchDestinos();
  }, [formData.lugarSalida]);

  const handleChange = (e) => {
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
        "La hora de regreso no puede ser menor a la hora de ida si es el mismo día."
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
                <Form.Label className="form-label">Fecha de Ida</Form.Label>
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
                <Form.Label className="form-label">Hora de Ida</Form.Label>
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
              <Form.Group controlId="lugarSalida">
                <Form.Label className="form-label">Lugar de salida</Form.Label>
                <Form.Control
                  as="select"
                  name="lugarSalida"
                  value={formData.lugarIda}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona tú lugar de salida</option>
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
                <Form.Label className="form-label">Temporada</Form.Label>
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
                <Form.Label className="form-label">Fecha de Regreso</Form.Label>
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
                <Form.Label className="form-label">Hora de Regreso</Form.Label>
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
              <Form.Group controlId="destino">
                <Form.Label className="form-label">Destino</Form.Label>
                <Form.Control
                  as="select"
                  name="destino"
                  value={formData.lugarRegreso}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un lugar de salida</option>
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
                <Form.Label className="form-label">
                  Número de Pasajeros
                </Form.Label>
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
            {loading ? "Cargando..." : "Cotizar Viaje  "}
            <AiOutlineSend style={{ marginRight: "8px", fontSize: "24px" }} />
          </Button>
        </Form>

        <Row>
          {vehiculos.length > 0 ? (
            vehiculos.map((vehiculo, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={imagenesVehiculos[vehiculo.tipo]} // Asigna la imagen según el tipo de vehículo
                    alt={`Imagen de ${vehiculo.tipo}`}
                  />
                  <Card.Body>
                    <Card.Title>{vehiculo.tipo}</Card.Title>
                    <Card.Text>
                      Capacidad: {vehiculo.capacidad} pasajeros <br />
                      Precio: ${vehiculo.valor_base_un_dia}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => alert(`Compartir ${vehiculo.tipo}`)} // Lógica de compartir
                      endIcon={<ShareIcon />}
                    >
                      Cotizar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>
              No hay vehículos disponibles para la cantidad de pasajeros
              ingresada.
            </p>
          )}
        </Row>
      </Card>
    </Container>
  );
};

export default FormCotizacion;

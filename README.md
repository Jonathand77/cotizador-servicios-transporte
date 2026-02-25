# 🚌 Transportation Quoting System

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![Database](https://img.shields.io/badge/Database-Supabase%20%7C%20MySQL-3ECF8E?logo=supabase)
![Architecture](https://img.shields.io/badge/Architecture-Full%20Stack-blue)
![GitHub repo size](https://img.shields.io/github/repo-size/Jonathand77/cotizador-servicios-transporte)
![GitHub contributors](https://img.shields.io/github/contributors/Jonathand77/cotizador-servicios-transporte)
![GitHub last commit](https://img.shields.io/github/last-commit/Jonathand77/cotizador-servicios-transporte)
![Languages](https://img.shields.io/github/languages/count/Jonathand77/cotizador-servicios-transporte)
![License](https://img.shields.io/badge/License-MIT-success)

## 👤 Autor

| 👨‍💻 Nombre | 📧 Correo | 🏫 Link directo al repositorio | 🐙 Usuario GitHub |
|---|---|---|---|
| **Jonathan David Fernandez Vargas** | jonathanfdez62@gmail.com | [LinkRepositorio](https://github.com/Jonathand77/cotizador-servicios-transporte) | [jonathand77](https://github.com/jonathand77) |

**Sistema web de cotización de transporte desarrollado en colaboración con la empresa colombiana COOTRAESPECIALES.**

---

Sistema web de cotización de transporte desarrollado en colaboración con la empresa colombiana **COOTRAESPECIALES**.
Diseñado para simplificar y automatizar el proceso de generación de estimaciones de costos de transporte, el sistema permite calcular cotizaciones según lugar de salida, destino, número de pasajeros y noches, sugiriendo vehículos según capacidad y reglas de negocio.


![Logo de Cootraespeciales](https://cootraespeciales.com/sitio/wp-content/uploads/2022/06/logo-cootraespeciales.svg)

---

## 📌 Tabla de contenido

- [Descripción](#-descripción)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Endpoints principales](#-endpoints-principales)
- [Scripts disponibles](#-scripts-disponibles)
- [Deployment](#-deployment)
- [Licencia](#-licencia)

---

## 🔍 Descripción

Este proyecto automatiza la generación de cotizaciones de transporte para facilitar el proceso comercial y operativo.

**Flujo general:**
1. El usuario selecciona origen, destino, pasajeros y noches.
2. El frontend consulta la API.
3. El backend calcula valores con reglas de negocio y capacidad de vehículos.
4. Se retorna la cotización estimada.

---

## 🛠️ Stack tecnológico

- **Frontend:** React, Bootstrap, Axios
- **Backend:** Node.js, Express
- **Datos:** Supabase (actual) / MySQL (soporte histórico)
- **Lenguajes:** HTML, CSS, JavaScript

---

## 📁 Estructura del proyecto

```text
cotizador-servicios-transporte/
├── Back/
│   ├── index.js
│   ├── package.json
│   ├── api/
│   │   └── server.js
│   └── vercel.json
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
└── README.md
```

---

## ✅ Requisitos previos

- Git
- Node.js 18+ y npm
- Visual Studio Code (recomendado)
- Navegador web (Chrome/Edge/Firefox)
- Variables de entorno configuradas (`Back/.env` y `frontend/.env` cuando aplique)

---

## 🚀 Instalación y ejecución local

### 1) Clonar repositorio

```bash
git clone https://github.com/user/cotizador-servicios-transporte.git
cd cotizador-servicios-transporte
```

### 2) Instalar dependencias

```bash
npm install
npm --prefix Back install
npm --prefix frontend install
```

### 3) Configurar variables de entorno

En `Back/.env`, define al menos:

```env
SUPABASE_KEY=tu_clave_de_supabase
PORT=8080
```

### 4) Ejecutar backend

```bash
cd Back
node index.js
```

API disponible en: `http://localhost:8080/api`

### 5) Ejecutar frontend

En otra terminal:

```bash
cd frontend
npm start
```

Frontend disponible en: `http://localhost:3000`

---

## 🔌 Endpoints principales

- **GET** `/api/destinos`  
  Retorna el listado de destinos disponibles.

- **POST** `/api/cotizar`  
  Calcula cotización según reglas de negocio.

Ejemplo de body para cotizar:

```json
{
  "numPasajeros": 20,
  "lugarSalida": "2",
  "destino": "5",
  "noches": 1
}
```

---

## 📜 Scripts disponibles

### Frontend (`frontend/package.json`)

- `npm start`: inicia en modo desarrollo
- `npm test`: ejecuta pruebas
- `npm run build`: construye para producción
- `npm run eject`: expone configuración de CRA (irreversible)

### Backend (`Back/package.json`)

- No tiene script de inicio definido actualmente.
- Ejecución recomendada: `node index.js`

---

## 🌐 Deployment

Para despliegue de frontend con CRA:
- [Create React App Deployment Guide](https://facebook.github.io/create-react-app/docs/deployment)

Backend incluye configuración para Vercel en `Back/vercel.json`.

---

## 📚 Recursos útiles

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**.  
Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙌 Agradecimientos

- Comparte este proyecto 📢
- Dale una estrella en GitHub ⭐
- Envía feedback para seguir mejorándolo 🤓

---
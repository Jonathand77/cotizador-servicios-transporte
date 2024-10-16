const express = require("express");
const app = express();
const server = require("./api/server");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(express.json({ extended: false }));

app.use("/api", server);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
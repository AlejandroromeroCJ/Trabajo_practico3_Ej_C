import express from "express";
import { conectarDB } from "./db.js";
import vehiculosRouter from "./vehiculos.js";
import conductoresRouter from "./conductores.js";
import viajesRouter from "./viajes.js";
import usuariosRouter from "./usuarios.js";
import cors from "cors";
import authRouter, { authConfig } from "./auth.js";

conectarDB();

const app = express();
const port = 4545;

// Para interpretar body como JSON
app.use(express.json());
app.use(cors());

authConfig();
app.get("/", (req, res) => {
  // Responder con string
  res.send("Hola mundo!");
});

app.use("/vehiculos", vehiculosRouter);
app.use("/conductores", conductoresRouter);
app.use("/viajes", viajesRouter);
app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});

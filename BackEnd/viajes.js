import express from "express";
import { db } from "./db.js";
import { validarId, verificarValidaciones } from "./validaciones.js";

const router = express.Router();

// GET para entregar listado de viajes
router.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM viajes");
  res.json({ success: true, data: rows });
});

// POST viajes
router.post("/", async (req, res) => {
  // Obtengo body
  const { vehiculo_id,conductor_id,fecha_salida,fecha_llegada,origen,destino,kilometros,observaciones } = req.body;

  const [result] = await db.execute(
    "INSERT INTO viajes (vehiculo_id,conductor_id,fecha_salida,fecha_llegada,origen,destino,kilometros,observaciones) VALUES (?,?,?,?,?,?,?,?)",
    [vehiculo_id,conductor_id,fecha_salida,fecha_llegada,origen,destino,kilometros,observaciones]
  );

  res
    .status(201)
    .json({ success: true, data: { id: result.insertId, vehiculo_id,conductor_id,fecha_salida,fecha_llegada,origen,destino,kilometros,observaciones } });
});

//DELETE viajes (no lo pide)

//Modificar vehiculos (no lo pide)

//get viajes por idconductor
router.get("/conductor/:id",validarId,verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await db.execute("SELECT * FROM viajes WHERE conductor_id=?", [id]);
  res.json({ success: true, data: rows });
});

//get viajes por idvehiculo
router.get("/vehiculo/:id",validarId,verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await db.execute("SELECT * FROM viajes WHERE vehiculo_id=?", [id]);
  res.json({ success: true, data: rows });
});

export default router;

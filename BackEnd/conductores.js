import express from "express";
import { db } from "./db.js";
import { validarId, verificarValidaciones } from "./validaciones.js";

const router = express.Router();

//GET CONDUCTORES
router.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM conductores");
  res.json({ success: true, data: rows });
});

//POST CONDUCTORES
router.post("/", async (req, res) => {
  // Obtengo body
  const { nombre,apellido,dni,licencia,vencimientolic } = req.body;

  const [result] = await db.execute(
    "INSERT INTO conductores (nombre,apellido,dni,licencia,vencimientolic) VALUES (?,?,?,?,?)",
    [nombre,apellido,dni,licencia,vencimientolic]
  );

  res
    .status(201)
    .json({ success: true, data: { id: result.insertId, nombre } });
});

//DELETE Conductores
router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  // Obtengo id
  const id = Number(req.params.id);

  await db.execute("DELETE FROM conductores WHERE idconductores=?", [id]);
  res.json({ success: true, data: id });
});

//Modificar conductores
router.put(
  "/:id",
  validarId,
  verificarValidaciones,
  async (req, res) => {
    // Obtengo id
    const id = Number(req.params.id);

    // Obtengo body
    const { nombre,apellido,dni,licencia,vencimientolic } = req.body;

    await db.execute("UPDATE conductores SET nombre=?, apellido=?, dni=?, licencia=?, vencimientolic=? WHERE idconductores=?", [nombre,apellido,dni,licencia,vencimientolic, id]);

    res.json({ success: true, data: { id, nombre } });
  }
);

export default router;

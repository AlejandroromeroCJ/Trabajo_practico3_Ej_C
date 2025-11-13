import express from "express";
import { db } from "./db.js";
import { validarId, verificarValidaciones } from "./validaciones.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM conductores");
  res.json({ success: true, data: rows });
});

router.post("/", async (req, res) => {
  const { nombre,apellido,dni,licencia,vencimientolic } = req.body;
  const [result] = await db.execute(
    "INSERT INTO conductores (nombre,apellido,dni,licencia,vencimientolic) VALUES (?,?,?,?,?)",
    [nombre,apellido,dni,licencia,vencimientolic]
  );

  res
    .status(201)
    .json({ success: true, data: { id: result.insertId, nombre } });
});

router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);
  await db.execute("DELETE FROM conductores WHERE idconductores=?", [id]);
  res.json({ success: true, data: id });
});

router.put("/:id",validarId,verificarValidaciones,async (req, res) => {
    const id = Number(req.params.id);
    const { nombre,apellido,dni,licencia,vencimientolic } = req.body;
    await db.execute("UPDATE conductores SET nombre=?, apellido=?, dni=?, licencia=?, vencimientolic=? WHERE idconductores=?", [nombre,apellido,dni,licencia,vencimientolic, id]);
    res.json({ success: true, data: { id, nombre } });
  }
);

export default router;

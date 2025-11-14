import express from "express";
import { db } from "./db.js";
import { validarId, verificarValidaciones } from "./validaciones.js";

const router = express.Router();

// GET para entregar listado de vehiculos
router.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM vehiculos");
  res.json({ success: true, data: rows });
});

// POST VEHICULOS
router.post("/", async (req, res) => {
  const { marca,modelo,patente,año,capacidadkg } = req.body;
  const [result] = await db.execute(
    "INSERT INTO vehiculos (marca,modelo,patente,año,capacidadkg) VALUES (?,?,?,?,?)",
    [marca,modelo,patente,año,capacidadkg]
  );

  res
    .status(201)
    .json({ success: true, data: { id: result.insertId, marca,modelo,patente,año,capacidadkg } });
});

//DELETE vehiculos
router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);
  await db.execute("DELETE FROM vehiculos WHERE idvehiculos=?", [id]);
  res.json({ success: true, data: id });
});

//Modificar vehiculos
router.put("/:id",validarId,verificarValidaciones,async (req, res) => {
    const id = Number(req.params.id);
    const { marca,modelo,patente,año,capacidadkg } = req.body;
    await db.execute("UPDATE vehiculos SET marca=?, modelo=?, patente=?, año=?, capacidadkg=? WHERE idvehiculos=?", [marca,modelo,patente,año,capacidadkg, id]);
    res.json({ success: true, data: { id, marca,modelo,patente } });
  }
);

export default router;

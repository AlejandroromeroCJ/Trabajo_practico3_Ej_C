import express from "express";
import { db } from "./db.js";
import { validarId, verificarValidaciones } from "./validaciones.js";
import { body, param } from "express-validator";
import bcrypt from "bcrypt";
import { verificarAutenticacion, verificarAutorizacion } from "./auth.js";

const router = express.Router();

router.get("/", verificarAutenticacion, async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM usuarios");
  // RECORDAR Quitar la contraseña en la api
  res.json({
    success: true,
    usuarios: rows.map((u) => ({ ...u, password_hash: undefined })),
  });
});

router.get(
  "/:id",
  //Aqui si se autentica
  verificarAutenticacion,
  validarId,
  verificarValidaciones,
  //Aqui no se autentica
  //verificarAutenticacion,
  async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await db.execute(
      "SELECT idusuarios, nombre, email FROM usuarios WHERE idusuarios=?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({ success: true, usuario: rows[0] });
  }
);

router.post(
  "/",
  verificarAutenticacion,
  body("nombre", "Nombre inválido").isAlpha("es-ES").isLength({ max: 50 }),
  body("email", "Apellido inválido").isEmail().withMessage('Debe ser un email válido').isLength({ max: 100 }),
  body("password", "Contraseña inválida").isStrongPassword({
    minLength: 8, // Minimo de 8 caracteres
    minLowercase: 1, // Al menos una letra en minusculas
    minUppercase: 0, // Letras mayusculas opcionales
    minNumbers: 1, // Al menos un número
    minSymbols: 0, // Símbolos opcionales
  }),
  verificarValidaciones,
  async (req, res) => {
    const { nombre, email, password } = req.body;

    // Creamos Hash de la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)",
      [nombre, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      data: { id: result.insertId, nombre, email},
    });
  }
);

export default router;

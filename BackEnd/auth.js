import express from "express";
import { db } from "./db.js";
import { verificarValidaciones } from "./validaciones.js";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const router = express.Router();

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      next(null, payload);
    })
  );
}

export const verificarAutenticacion = passport.authenticate("jwt", {
  session: false,
});

export const verificarAutorizacion = (rol) => {
  return (req, res, next) => {
    const roles = req.user.roles;
    if (!roles.includes(rol)) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no autorizado" });
    }
    next();
  };
};

router.get("/isValidToken", verificarAutenticacion, (req, res) => {
  res.json({ success: true, message: "Token válido" });
});

router.post(
  "/login",
  body("email", "Email Inválido").isEmail().withMessage('Debe ser un email válido').isLength({ max: 100 }),
  body("password").isStrongPassword({
    minLength: 8, // Minimo de 8 caracteres
    minLowercase: 1, // Al menos una letra en minusculas
    minUppercase: 0, // Letras mayusculas opcionales
    minNumbers: 1, // Al menos un número
    minSymbols: 0, // Símbolos opcionales
  }),
  verificarValidaciones,
  async (req, res) => {
    const { email, password } = req.body;
    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE email=?",
      [email]
    );

    if (usuarios.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Usuario inválido" });
    }


    const hashedPassword = usuarios[0].password;
    const passwordComparada = await bcrypt.compare(password, hashedPassword);
    if (!passwordComparada) {
      return res
        .status(400)
        .json({ success: false, error: "Contraseña inválido" });
    }


    const payload = { userId: usuarios[0].id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });


    res.json({
      success: true,
      token,
      username: usuarios[0].username
    });
  }
);

export default router;

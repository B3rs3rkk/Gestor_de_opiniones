import {Router} from 'express';
import { actualizarContraseña, actualizarUsuario } from '../usuarios/usuario.controller.js';
import {actualizarContraseñaValidator, actualizarUsuarioValidator} from '../middlewares/validators-usuarios.js';

const router = Router()

router.put("/actualizar", actualizarUsuarioValidator, actualizarUsuario)
router.patch("/actualizar-contraseña", actualizarContraseñaValidator, actualizarContraseña)

export default router;
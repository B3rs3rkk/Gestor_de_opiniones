import {Router} from 'express';
import { actualizarContraseña, actualizarUsuario } from '../usuarios/usuario.controller.js';
import {actualizarContraseñaValidator, actualizarUsuarioValidator} from '../middlewares/validators-usuarios.js';

const router = Router()

router.put("/update", actualizarUsuarioValidator, actualizarUsuario)
router.patch("/update_password", actualizarContraseñaValidator, actualizarContraseña)

export default router;
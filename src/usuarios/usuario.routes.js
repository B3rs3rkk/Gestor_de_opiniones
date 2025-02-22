import {Router} from 'express';
import { actualizarContraseña, actualizarUsuario } from '../usuarios/usuario.controller.js';
import {actualizarContraseñaValidator, actualizarUsuarioValidator} from '../middlewares/validators-usuarios.js';

const router = Router()

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error de validación
 */
router.put("/update/:id", actualizarUsuarioValidator, actualizarUsuario)

/**
 * @swagger
 * /update_password/{id}:
 *   patch:
 *     summary: Actualizar contraseña
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Error de validación
 */
router.patch("/update_password/:id", actualizarContraseñaValidator, actualizarContraseña)

export default router;
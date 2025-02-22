import { Router } from "express";
import { crearPublicacion, modificarPublicacion, borrarPublicacion } from "./publi.controller.js";
import { agregarPubliValidator, actualizar_Eliminar_PububliValidator } from "../middlewares/validators-publi.js";

const router = Router()

/**
 * @swagger
 * /agregarPublicacion:
 *   post:
 *     summary: Crear una nueva publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publicación creada
 *       400:
 *         description: Error de validación
 */
router.post("/agregarPublicacion", agregarPubliValidator, crearPublicacion)

/**
 * @swagger
 * /actualizarPublicacion/{idPublicacion}:
 *   put:
 *     summary: Actualizar una publicación
 *     parameters:
 *       - in: path
 *         name: idPublicacion
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       400:
 *         description: Error de validación
 */
router.put("/actualizarPublicacion/:idPublicacion", actualizar_Eliminar_PububliValidator, modificarPublicacion)

/**
 * @swagger
 * /eliminarPublicacion/{idPublicacion}:
 *   delete:
 *     summary: Eliminar una publicación
 *     parameters:
 *       - in: path
 *         name: idPublicacion
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada
 *       400:
 *         description: Error de validación
 */
router.delete("/eliminarPublicacion/:idPublicacion", actualizar_Eliminar_PububliValidator, borrarPublicacion)

export default router
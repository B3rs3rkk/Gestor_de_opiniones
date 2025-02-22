import { Router } from "express";
import { añadirOpinion, modificarOpinion, borrarOpinion } from "./op.controller.js";
import { agregaropinionValidator, actualizaropinionValidator, eliminaropinionValidator } from "../middlewares/validators-op.js";

const router = Router()

/**
 * @swagger
 * /agregarOpinion:
 *   post:
 *     summary: Añadir una nueva opinión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Opinión añadida
 *       400:
 *         description: Error de validación
 */
router.post("/agregarOpinion", agregaropinionValidator, añadirOpinion)

/**
 * @swagger
 * /actualizarOpinion/{idOpinion}:
 *   patch:
 *     summary: Actualizar una opinión
 *     parameters:
 *       - in: path
 *         name: idOpinion
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la opinión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Opinión actualizada
 *       400:
 *         description: Error de validación
 */
router.patch("/actualizarOpinion/:idOpinion", actualizaropinionValidator, modificarOpinion)

/**
 * @swagger
 * /eliminarOpinion/{idOpinion}:
 *   delete:
 *     summary: Eliminar una opinión
 *     parameters:
 *       - in: path
 *         name: idOpinion
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la opinión
 *     responses:
 *       200:
 *         description: Opinión eliminada
 *       400:
 *         description: Error de validación
 */
router.delete("/eliminarOpinion/:idOpinion", eliminaropinionValidator, borrarOpinion)

export default router;
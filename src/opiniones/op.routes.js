import { Router } from "express";
import { añadirOpinion, modificarOpinion, borrarOpinion } from "./op.controller.js";
import { agregaropinionValidator, actualizaropinionValidator, eliminaropinionValidator } from "../middlewares/validators-op.js";

const router = Router()

router.post("/agregarOpinion", agregaropinionValidator, añadirOpinion)
router.patch("/actualizarOpinion/:idOpinion", actualizaropinionValidator, modificarOpinion)
router.delete("/eliminarOpinion/:idOpinion", eliminaropinionValidator, borrarOpinion)
export default router;
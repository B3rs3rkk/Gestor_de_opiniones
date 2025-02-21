import { Router } from "express";
import { agregarOp, editarOp, eliminarOP } from "./op.controller.js";
import { agregaropinionValidator, actualizaropinionValidator, eliminaropinionValidator } from "../middlewares/validators-op.js";

const router = Router()

router.post("/agregarComentario/:pid", agregaropinionValidator, agregarOp)
router.patch("/actualizarComentario/:cid", actualizaropinionValidator, editarOp)
router.delete("/eliminarComentario/:cid", eliminaropinionValidator, eliminarOP)
export default router;
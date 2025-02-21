import { Router } from "express";
import { agregarPubli, actualizarPubli, eliminarPubli } from "./publi.controller.js";
import { agregarPubliValidator, actualizar_Eliminar_PububliValidator } from "../middlewares/validators-publi.js";

const router = Router()

router.post("/agregarPublicacion", agregarPubliValidator, agregarPubli)

router.put("/actualizarPublicacion/:pid", actualizar_Eliminar_PububliValidator, actualizarPubli)

router.delete("/eliminarPublicacion/:pid", actualizar_Eliminar_PububliValidator, eliminarPubli)

export default router
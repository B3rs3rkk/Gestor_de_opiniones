import { Router } from "express";
import { crearPublicacion, modificarPublicacion, borrarPublicacion } from "./publi.controller.js";
import { agregarPubliValidator, actualizar_Eliminar_PububliValidator } from "../middlewares/validators-publi.js";

const router = Router()

router.post("/agregarPublicacion", agregarPubliValidator, crearPublicacion)

router.put("/actualizarPublicacion/:idPublicacion", actualizar_Eliminar_PububliValidator, modificarPublicacion)

router.delete("/eliminarPublicacion/:idPublicacion", actualizar_Eliminar_PububliValidator, borrarPublicacion)

export default router
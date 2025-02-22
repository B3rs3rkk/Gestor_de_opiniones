import { body, param } from "express-validator";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validar-roles.js";
import { validarCampos } from "./validar-campos.js";

export const agregarPubliValidator =[
    validateJWT,
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("categoria").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("descripcion").notEmpty().withMessage("la descripcion es requerida"),
    validarCampos,
    handleErrors
]

export const actualizar_Eliminar_PububliValidator=[
    validateJWT,
    param("idPublicacion").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]


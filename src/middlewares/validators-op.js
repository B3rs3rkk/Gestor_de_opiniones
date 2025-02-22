import { body, param } from "express-validator";
import { validateJWT } from "./validate-jwt.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";

export const agregaropinionValidator =[
    validateJWT,
        body("descipcion").notEmpty().withMessage("la descipcion es requerida"),
        validarCampos,
        handleErrors
]

export const actualizaropinionValidator =[
    validateJWT,
    body("descipcion").notEmpty().withMessage("El descipcion es requerido"),
    param("idOpinion").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

export const eliminaropinionValidator =[
    validateJWT,
    param("idOpinion").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]
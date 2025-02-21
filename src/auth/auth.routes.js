import { Router } from "express";
import { registrar, logiar } from "./auth.controller.js";
import { loggerValidator, registerarValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.post("/registrar", uploadProfilePicture.single("profilePicture"), registerarValidator, registrar)

router.post("/loggiar", loggerValidator, logiar)

export default router
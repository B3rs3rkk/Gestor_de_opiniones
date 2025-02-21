import { config } from "dotenv";
import { initServer } from "./configs/server.js"
import { categoria } from "./configs/crearCategoriaDefault.js";
import {administrador} from "./configs/crearAdmin.js"

config()
initServer()
administrador()
categoria()
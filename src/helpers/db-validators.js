import Usuario from "../usuarios/usuario.model.js";

export const correoExists = async (correo = "") => {
    const existe = await Usuario.findOne({correo})
    if(existe){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await Usuario.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const usernameExists = async (username = " ") =>{
    const existe = await Usuario.findOne({username})
    if(existe){
        throw new Error(`El nombre de usuario ${username} ya esta registrado`)
    }
}
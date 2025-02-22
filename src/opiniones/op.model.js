import { Schema, model } from "mongoose";

const opinionesSchema = Schema({
    descipcion:{
        type: String,
        required: [true, "El texto es necesario"],
        maxLength: [200, "El texto no puede pasar los 200 caracteres"]
    },
    usuario:{
        type: Schema.ObjectId,
        ref: 'usuario',
        required: true
    },
    idPublicacion: { // Cambiado a idPublicacion
        type: Schema.ObjectId,
        ref: 'publicacion',
        required: true
    }
})

export default model("opiniones", opinionesSchema)
import {Schema, model} from 'mongoose';

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        maxLenght:[40, 'El nombre no puede tener más de 40 caracteres']
    },


    username:{
        type:String,
        required:[true, 'El username es obligatorio'],
        maxLenght:[20, 'El username no puede tener más de 20 caracteres'],
    },

    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },

    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria'],
        maxLenght:[20, 'La contraseña no puede tener más de 20 caracteres'],
    },

    rol:{
        type:String,
        required:true,
        enum:['USER_ROLE'],
    },

    profilePicture:{
        type:String,
        default:null
    },

    status:{
        type:Boolean,
        default:true
    }

})

usuarioSchema.methods.toJSON = function(){
    const {_id, password, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('Usuario', usuarioSchema);
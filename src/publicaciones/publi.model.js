import {Schema,model} from 'mongoose';

const publicacionSchema = new Schema({
    titulo:{
        type:String,
        required:[true, 'El titulo es obligatorio'],
        maxLenght:[40, 'El titulo no puede tener más de 40 caracteres']
    },

    categoria:{
        type: Schema.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatoria']
    },

    descripcion:{
        type:String,
        required:[true, 'La descripcion es obligatoria'],
        maxLenght:[200, 'La descripcion no puede tener más de 200 caracteres']
    },

    estado:{
        type:Boolean,
        default:true
    },

    opiniones:[{
        type: Schema.ObjectId,
        ref: 'Opinion'
    }],

    usuario:{
        type: Schema.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    }
})

export default model('Publicacion', publicacionSchema);
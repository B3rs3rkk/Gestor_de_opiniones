import Publicaciones from "./publi.model.js";
import Usuarios from "../usuarios/usuario.model.js";

export const crearPublicacion = async (req, res) => {
    try {
        const { usuario } = req;
        const { titulo, categoria, contenido, descripcion } = req.body;

        const nuevaPublicacion = new Publicaciones({
            titulo,
            categoria,
            descripcion,
            texto: contenido,
            usuario: usuario._id
        });

        const resultado = await nuevaPublicacion.save();

        return res.status(201).json({
            exito: true,
            mensaje: "Publicación añadida exitosamente",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al registrar la publicación",
            detalle: error.message
        });
    }
};

export const modificarPublicacion = async (req, res) => {
    try {
        const { usuario } = req;
        const { idPublicacion } = req.params;
        const nuevaData = req.body;

        const publicacionExistente = await Publicaciones.findById(idPublicacion);
        
        if (!publicacionExistente) {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontró la publicación"

            });

        }
        if (!publicacionExistente.usuario.equals(usuario._id)) {
            return res.status(403).json({
                exito: false,
                mensaje: "Acceso denegado para modificar esta publicación"
            });
        }

        const publicacionActualizada = await Publicaciones.findByIdAndUpdate(
            idPublicacion,
            { $set: nuevaData },
            { new: true }
        );

        return res.status(200).json({
            exito: true,
            mensaje: "Publicación modificada con éxito",
            datos: publicacionActualizada
        });
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al actualizar la publicación",
            detalle: error.message
        });
    }
};

export const borrarPublicacion = async (req, res) => {
    try {
        const { usuario } = req;
        const { idPublicacion } = req.params;

        const publicacionExistente = await Publicaciones.findById(idPublicacion);

        if (!publicacionExistente) {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontró la publicación"
            });
        }
        if (!publicacionExistente.usuario.equals(usuario._id)) {
            return res.status(403).json({
                exito: false,
                mensaje: "Acceso denegado para eliminar esta publicación"
            });
        }

        await Publicaciones.findByIdAndDelete(idPublicacion);

        return res.status(200).json({
            exito: true,
            mensaje: "Publicación eliminada exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al eliminar la publicación",
            detalle: error.message
        });
    }
};

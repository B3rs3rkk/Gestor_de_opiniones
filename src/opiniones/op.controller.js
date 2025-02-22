import Opinion from "../opiniones/op.model.js";
import Publicacion from "../publicaciones/publi.model.js";

export const añadirOpinion = async (req, res) => {
    try {
        const { usuario } = req;
        const { idPublicacion, descripcion } = req.body;  // Corregí el typo de "descipcion" a "descripcion"

        const publicacion = await Publicacion.findById(idPublicacion);
        if (!publicacion) {
            return res.status(404).json({
                exito: false,
                mensaje: "La publicación no fue encontrada"
            });
        }

        
        const nuevaOpinion = new Opinion({
            descripcion,  
            usuario: usuario._id,
            idPublicacion
        });

        
        const opinionGuardada = await nuevaOpinion.save();

        
        publicacion.opiniones.push(opinionGuardada._id);
        await publicacion.save();

        
        await publicacion.populate({
            path: "opiniones",
            select: "descripcion -_id",  
            populate: {
                path: "usuario",
                select: "nombreUsuario -_id"
            }
        });

        
        return res.status(200).json({
            exito: true,
            mensaje: "Opinión añadida correctamente",
            postConReseñas: {
                autor: publicacion.usuario,
                titulo: publicacion.titulo,
                descripcion: publicacion.descripcion,  
                reseñas: publicacion.opiniones
            }
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al añadir la opinión",
            error: err.message
        });
    }
};


export const modificarOpinion = async (req, res) => {
    try {
        const { usuario } = req;
        const { idOpinion } = req.params;
        const { contenido } = req.body;

        const opinion = await Opinion.findById(idOpinion);
        if (!opinion) {
            return res.status(404).json({
                exito: false,
                mensaje: "La opinion no existe"
            });
        }
        if (!reseña.usuario.equals(usuario._id)) {
            return res.status(403).json({
                exito: false,
                mensaje: "No tienes autorización para modificar esta opinion"
            });
        }

        opinion.contenido = contenido;
        const opinionActualizada = await opinion.save();

        return res.status(200).json({
            exito: true,
            mensaje: "la opinion fue editada exitosamente",
            datos: {
                contenido: opinionActualizada.contenido,
                autor: opinionActualizada.usuario.nombre
            }
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al modificar la opinion",
            error: err.message
        });
    }
};

export const borrarOpinion = async (req, res) => {
    try {
        const { usuario } = req;
        const { idOpinion } = req.params;

        const opinion = await Opinion.findById(idOpinion);
        if (!opinion) {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontró la opinion"
            });
        }
        if (!reseña.usuario.equals(usuario._id)) {
            return res.status(403).json({
                exito: false,
                mensaje: "No tienes permiso para eliminar esta opinion"
            });
        }

        const opinionAsociada = await Opinion.findOne({ opinion: idOpinion });
        if (opinionAsociada) {
            opinionAsociada.opinion = postAsociado.reseñas.filter(
                (reseñaId) => reseñaId.toString() !== idOpinion.toString()
            );
            await opinionAsociada.save();
        }

        await Reseñas.findByIdAndDelete(idOpinion);

        return res.status(200).json({
            exito: true,
            mensaje: "opinion eliminada satisfactoriamente"
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al eliminar la opinion",
            error: err.message
        });
    }
};

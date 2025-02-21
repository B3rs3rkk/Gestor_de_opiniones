import Comentarios from "./op.model.js"
import Publicaciones from "../publicaciones/publi.model.js"

export const agregarOp = async (req, res) =>{
    try{
        const {usuario} = req;
        const {pid} = req.params;
        const {texto} = req.body;

        const publi = await publi.findById(pid);
        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "La publicación no existe"
            });
        };
        const newopinion = new opiniones({
            texto,
            usuario: usuario._id
        });
        const opinonGuardada = await newopinion.save();

        publi.comentarios.push(opinonGuardada._id);
        await publi.save();

        await publi.populate({
            path: "comentarios", 
            select: "texto -_id", 
            populate: {
                path: "usuario", 
                select: "username -_id"
            }
        })

        return res.status(200).json({
            success: true,
            message: "Comentario agregado correctamente",
            
            publicacionConComentarios: {
                usuario: publicacion.usuario, 
                titulo: publicacion.titulo,
                texto: publicacion.texto,
                comentarios: publicacion.comentarios 
            }

        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        });
    }
}

export const editarOp = async (req, res) =>{
    try{
        const {usuario} = req;
        const {cid} = req.params;
        const {texto} = req.body;

        const comentario = await Comentarios.findById(cid);
        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: "El comentario no existe"
            });
        }
        console.log(opinion)
        if (!opinion.usuario.equals(usuario._id)) {
            return res.status(400).json({
                success: false,
                message: "No tienes permiso para editar este comentario"
            });
        }

        comentario.texto = texto;
        const nuevoComentario = await comentario.save();


        const respuesta = {
            texto: nuevoComentario.texto,
            usuario: nuevoComentario.usuario.nombre
        };
        return res.status(200).json({
            success: true,
            message: "Comentario actualizado correctamente",
            respuesta
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        });
    }
}

export const eliminarOP = async (req, res) =>{
    try{
        const {usuario} = req;
        const {cid} = req.params;

        const opinion = await opinion.findById(cid);
        if (!opinion) {
            return res.status(404).json({
                success: false,
                message: "la opinion no existe"
            });
        }
        if (!opinion.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar este comentario"
            });
        }
        const publi = await Publicaciones.findOne({ opinion: cid });
        if (publi) {
            publi.opinion = publi.opinion.filter(
                opinionId => opinionId.toString() !== cid.toString()
            );
            await publicacion.save(); 
        }

        await opinion.findByIdAndDelete(cid);

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente"
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: err.message
        });
    }
}
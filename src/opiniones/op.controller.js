import opiniones from "./op.model.js"
import publicaciones from "../publicaciones/publi.model.js"

export const agregarOp = async (req, res) =>{
    try{
        const {usuario} = req;
        const {pid} = req.params;
        const {texto} = req.body;

        const publi = await publi.findById(pid);
        if (!publi) {
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

        publi.opinion.push(opinonGuardada._id);
        await publi.save();

        await publi.populate({
            path: "opiniones", 
            select: "texto -_id", 
            populate: {
                path: "usuario", 
                select: "username -_id"
            }
        })

        return res.status(200).json({
            success: true,
            message: " la opinion agregada correctamente",
            
            publicacionConOpinion: {
                usuario: publi.usuario, 
                titulo: publi.titulo,
                texto: publi.texto,
                opinion: publi.opinion 
            }

        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar la opinion",
            error: err.message
        });
    }
}

export const editarOp = async (req, res) =>{
    try{
        const {usuario} = req;
        const {cid} = req.params;
        const {texto} = req.body;

        const  opinion = await opinion.findById(cid);
        if (!opinion) {
            return res.status(404).json({
                success: false,
                message: "la opinion es inexistente"
            });
        }
        console.log(opinion)
        if (!opinion.usuario.equals(usuario._id)) {
            return res.status(400).json({
                success: false,
                message: "No tienes permiso para editar esta opinion"
            });
        }

        opinion.texto = texto;
        const newopinion = await opinion.save();


        const respuesta = {
            texto: newopinion.texto,
            usuario: newopinion.usuario.nombre
        };
        return res.status(200).json({
            success: true,
            message: "opinion actualizada",
            respuesta
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar la opinion",
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
        const publi = await publi.findOne({ opinion: cid });
        if (publi) {
            publi.opinion = publi.opinion.filter(
                opinionId => opinionId.toString() !== cid.toString()
            );
            await publi.save(); 
        }

        await opinion.findByIdAndDelete(cid);

        return res.status(200).json({
            success: true,
            message: "opinion eliminada"
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la opinion",
            error: err.message
        });
    }
}
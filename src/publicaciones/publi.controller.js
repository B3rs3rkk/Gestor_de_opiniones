import Publicaciones from "./publi.model.js";
import Usuarios from "../usuarios/usuario.model.js";

export const agregarPubli = async (req, res) => {
    try {
        const { usuario, body } = req;
        const { titulo, categoria, texto } = body;

        const newPublicacion = new Publicaciones({
            titulo,
            categoria,
            texto,
            usuario: usuario._id
        });

        const guardar = await newPublicacion.save();

        return res.status(201).json({
            success: true,
            message: "Publicación creada",
            publicacion: guardar
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear",
            error: err.message
        });
    }
};

export const actualizarPubli = async (req, res) => {
    try {
        const { usuario } = req;
        const { pid } = req.params;
        const data = req.body;

        const publi = await publi.findById(pid);

        if (!publi) {
            return res.status(404).json({
                success: false,
                message: "La publicación no existe"
            });
        }
        if (!publi.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para actualizar esta publicación"
            });
        }

        const publiActualizada = await publi.findByIdAndUpdate(
            pid,
            { $set: data },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Publicación actualizada correctamente",
            publicacion: publiActualizada
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: err.message
        });
    }
};

export const eliminarPubli = async (req, res) => {
    try {
        const { usuario } = req;
        const { pid } = req.params;

        const publi = await publi.findById(pid);

        if (!publi) {
            return res.status(404).json({
                success: false,
                message: "La publicación no existe"
            });
        }
        if (!publi.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar esta publicación"
            });
        }

        await publi.findByIdAndDelete(pid);

        return res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        });
    }
};
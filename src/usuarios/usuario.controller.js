import bcrypt from "bcrypt";
import Usuarios from "../usuarios/usuario.model.js";

export const actualizarUsuario = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        const actualizar = await Usuarios.findOneAndUpdate(
            { _id: usuario._id },
            { $set: data },
            { new: true }
        );

        if (!actualizar) {
            return res.status(403).json({
                success: false,
                message: "No se logro editar a los administradores o esta inixistente"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado ",
            actualizar
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar ",
            error: err.message
        });
    }
};

export const actualizarContraseña = async (req, res) => {
    try {
        const { usuario } = req;
        const { oldpassword, newpassword } = req.body;

        const usaurio = await Usuarios.findById(usuario._id);

        if (!usaurio) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const isOldPasswordValid = await bcrypt.compare(oldpassword, usuario.password);
        if (!isOldPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "la contraseña anterior no coincide"
            });
        }
        usuario.password = newpassword;
        await usuario.save();
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(contraNueva, salt);
        await usuario.save();

        return res.status(200).json({
            success: true,
            message: "la contraseña ah sido actualizada"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error usuario",
            error: err.message
        });
    }
};
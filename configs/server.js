import bcrypt from 'bcrypt';
import Usuario from "../user/usuario.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res, next) => {
    try {
        const { body: data, file } = req;
        const profilePicture = file ? file.filename : null;
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
        data.profilePicture = profilePicture;

        const user = await Usuario.create(data);

        return res.status(201).json({
            message: "Usuario ha sido registrado",
            nombre: user.nombre,
            correo: user.correo
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al registrar",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { correo, username, contra } = req.body;
    try {
        const user = await Usuario.findOne({
            $or: [{ correo }, { username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        const isPasswordValid = await bcrypt.compare(contra, user.contra);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user._id);

        return res.status(200).json({
            message: "Inicio de sesión correctamente",
            userDetails: { token }
        });
    } catch (err) {
        return res.status (500).json({
            message: "Inicio de sesión fallido",
            error: err.message
        });
    }
};
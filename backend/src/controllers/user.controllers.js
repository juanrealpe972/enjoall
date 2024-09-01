import { pool } from "../database/conexion.js";
import multer from "multer";
import bcrypt from "bcrypt"
import { validationResult } from "express-validator";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/users");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploat = multer({ storage: storage });
export const cargarImagen = uploat.single("photo_user");

export const getUsers = async (req, res) => {
    try {
        let sql = `SELECT * FROM users`;
        const [rows] = await pool.query(sql);
        if (rows.length > 0) {
            res.status(200).json({ message: "Los usuarios son: ", data: rows });
        } else {
            res.status(200).json({ message: "No hay usuarios registrados por el momento" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
};

export const createUsers = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pk_id_user, name_user, password_user, phone_user, address_email_user, country_user, job_user, gender_identity_user } = req.body;

        const checkSqlId = `SELECT * FROM users WHERE pk_id_user = ? OR address_email_user = ?`;
        const [existingId] = await pool.query(checkSqlId, [pk_id_user, address_email_user]);

        if (existingId.length > 0) {
            return res.status(200).json({ message: "Ya existe un usuario con dicha cédula o correo electrónico" });
        }

        const photo_user = req.file ? req.file.originalname : "";
        const bcryptPassword = bcrypt.hashSync(password_user, 12);

        let sql = `INSERT INTO users (pk_id_user, name_user, password_user, photo_user, phone_user, address_email_user, country_user, role_user, status_user, job_user, gender_identity_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const [rows] = await pool.query(sql, [pk_id_user, name_user, bcryptPassword, photo_user, phone_user, address_email_user, country_user, 'operador', 'activo', job_user, gender_identity_user]);
        if(rows.affectedRows > 0){
            res.status(201).json({ message: "Usuario creado con exito" });
        }else{
            res.status(200).json({ message: "Error al crear el usuario" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
}

//listar un usuario
export const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        let sql = `SELECT * FROM users WHERE pk_id_user = ?`
        const [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.status(200).json({ message: "El usuario es: ", data: rows });
        }else {
            res.status(200).json({ message: "No se encontró al usuario con dicha cédula."});
        }
    }catch(error){
        res.status(500).json({ message: "Error en el servidor " + error });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { pk_id_user, name_user, phone_user, address_email_user, country_user, job_user, gender_identity_user } = req.body;
        const photo_user = req.file ? req.file.originalname : "";

        let sql = `UPDATE users SET pk_id_user = IFNULL(?, pk_id_user), name_user = IFNULL(?, name_user), phone_user = IFNULL(?, phone_user), address_email_user = IFNULL(?, address_email_user), country_user = IFNULL(?, country_user), job_user = IFNULL(?, job_user), gender_identity_user = IFNULL(?, gender_identity_user)`;
        const params = [pk_id_user, name_user, phone_user, address_email_user, country_user, job_user, gender_identity_user];

        const checkSqlId = `SELECT * FROM users WHERE pk_id_user = ? OR address_email_user = ?`;
        const [existingId] = await pool.query(checkSqlId, [pk_id_user, address_email_user]);

        if (existingId.length > 0) {
            return res.status(200).json({ message: "Ya existe un usuario con dicha cédula o correo electrónico" });
        }

        if (photo_user) {
            sql += `, photo_user = ?`;
            params.push(photo_user);
        }
        sql += ` WHERE pk_id_user = ?`;
        params.push(id);

        const [result] = await pool.query(sql, params);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Usuario actualizado con éxito" });
        } else {
            res.status(200).json({ message: "Error al actualizar al usuario" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
};

//cambiar contraseña
export const changePassword = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        const [rows] = await pool.query(`SELECT * FROM users WHERE pk_id_user = '${id}'`);

        if (rows.length === 0) {
            return res.status(200).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(oldPassword, user.password_user);
        if (!validPassword) {
            return res.status(200).json({ message: "Contraseña antigua incorrecta" });
        }

        if(newPassword !== confirmPassword){
            return res.status(200).json({ message: "Las nuevas contraseñas no coinciden" });
        }else {
            const bcryptPassword = bcrypt.hashSync(newPassword, 12);

            let sql = `UPDATE users SET password_user = '${bcryptPassword}' WHERE pk_id_user = '${id}'`
            const [result] = await pool.query(sql);
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Se registro la nueva contraseña con éxito" });
            } else {
                res.status(200).json({ message: "Error con el ID del usuario al cambiar la contraseña" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" + error });
    }
}

//eliminar usuario
export const deleteusers = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM users WHERE pk_id_user = ?`;
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Usuario eliminado con éxito" });
        } else {
            res.status(200).json({ message: "Error con el ID al eliminar al usuario" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
}

//cambiar estados del usuario 5 estados
export const changeStatus = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const id = req.params.id;
        const { status_user } = req.body;
        const sql = `UPDATE users SET status_user = ? WHERE pk_id_user = ?`;
        const [result] = await pool.query(sql, [status_user, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `El estado del usuario cambio a ${status_user} exitosamente` });
        } else {
            res.status(200).json({ message: "Error con el ID del usuario al cambiar el estado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
}
import { pool } from "../database/conexion.js";

export const createIncome = async (req, res) => {
    try {
        const { description_inc, amount_inc, date_inc, fk_user_inc } = req.body;
        let sql = `INSERT INTO income (description_inc, amount_inc, date_inc, fk_user_inc) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query(sql, [description_inc, amount_inc, date_inc, fk_user_inc]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Ingreso creado exitosamente." });
        } else {
            res.status(200).json({ message: "Error al crear ingreso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error });
    }
}

export const getTotalIncomeByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        let sql = `SELECT SUM(amount_inc) as total_income FROM income WHERE fk_user_inc = ?`;

        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            return res.status(200).json({ message: "Total de ingresos: ", total_income: result[0].total_income });
        } else {
            return res.status(200).json({ message: "Error con el ID proporcionado al traer los ingresos." });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

export const getIncomesByUserId = async (req, res) => {
    try {
        const id = req.body.id;
        let sql = `SELECT * FROM income WHERE fk_user_inc = ?`;
        const [result] = await pool.query(sql, [id]);
        if(result.length > 0) {
            res.status(200).json({ message: "El ingreso obtenido es: ", data: result});
        } else {
            res.status(200).json({ message: "No hay ingresos para el usuario por el momento." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error });
    }
}

export const updateIncome = async (req, res) => {
    try {
        const id = req.params.id;
        const { description_inc, amount_inc, date_inc } = req.body;

        const sql = `UPDATE income SET description_inc = IFNULL(?, description_inc), amount_inc = IFNULL(?, amount_inc), date_inc = IFNULL(?, date_inc) WHERE pk_id_inc = ?`;
        const [result] = await pool.query(sql, [description_inc, amount_inc, date_inc, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Ingreso actualizado exitosamente." });
        } else {
            return res.status(400).json({ message: "No se realizaron cambios en el ingreso." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

export const deleteIncome = async (req, res) => {
    try {
        const id = req.params.id;
        let sql = `DELETE FROM income WHERE pk_id_inc = ?`;
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Ingreso eliminado exitosamente." });
        } else {
            res.status(200).json({ message: "Error al eliminar ingreso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error });
    }
}
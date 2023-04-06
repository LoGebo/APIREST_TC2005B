import { pool } from '../db.js'

//Método GET para obtener todos los usuarios de la base de datos
export const getUsers = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM user");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

//Get con determinado id
export const getUser1 = async (req, res) => {
    try {
        const { iduser } = req.params;
        const [rows] = await pool.query("SELECT * FROM user WHERE iduser = ?", [
        iduser,
        ]);  
        if (rows.length <= 0) {
        return res.status(404).json({ message: "Employee not found" });
        }
        res.json(rows[0]);
        } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
        }
};



//Método POST para crear un usuario
export const createUser = async (req, res) => {
    try {
        const { email, password, type, username} = req.body;
        const [rows] = await pool.query(
            "INSERT INTO user (email, password, type, username) VALUES (?, ?, ?, ?)", [email, password, type, username]
        );
        res.status(201).json({ iduser: rows.insertId, email, password, type, username });
        } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
        }
}

//Método DELETE
export const deleteUser = async (req, res) => {
    try {
        const { iduser } = req.params;
        const [rows] = await pool.query("DELETE FROM user WHERE iduser = ?", [iduser]);
    
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.sendStatus(204);
        } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
        }

}
//Método PUT
export const updateUser = async (req, res) => {
    try {
        const { iduser } = req.params;
        const { username, email } = req.body;

        const [result] = await pool.query(
        "UPDATE user SET username = IFNULL(?, username), email = IFNULL(?, email) WHERE iduser = ?",
        [username, email, iduser]
    );

        if (result.affectedRows === 0)
        return res.status(404).json({ message: "Employee not found" });
      const [rows] = await pool.query("SELECT * FROM user WHERE iduser = ?", [
        iduser,
        ]);  
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
    };


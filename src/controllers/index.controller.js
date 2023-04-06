
import { pool } from '../db.js'

export const ping = async (req, res) => {
    const [result] = await pool.query("SELECT 2 * 2 ")
    res.json(result[0])
}
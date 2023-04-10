import { pool } from '../db.js'

// Método POST para crear un comentario
export const postComment = async (req, res) => {
    try {
        const { iduser,  comment } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO comment (iduser, comment) VALUES (?, ?)",
            [iduser, comment]
        );
        res.status(201).json({ idcomment: rows.insertId, iduser, comment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

// Método GET para obtener todos los comentarios con sus respuestas
export const getComments = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT c.*, r.idreply, r.idreply_parent, r.reply, u.username AS comment_username, u2.username AS reply_username
        FROM comment c
        LEFT JOIN replies r ON c.idcomment = r.idcomment
        LEFT JOIN user u ON c.iduser = u.iduser
        LEFT JOIN user u2 ON r.iduser = u2.iduser;
        `);

      // construir estructura de respuesta anidada
        const comments = rows.reduce((acc, row) => {
        const comment = acc.find(c => c.idcomment === row.idcomment);
        if (!comment) {
            acc.push({
            idcomment: row.idcomment,
            iduser: row.iduser,
            comment: row.comment,
            created_at: row.created_at,
            updated_at: row.updated_at,
            comment_username: row.comment_username,
            replies: [
                {
                idreply: row.idreply,
                idreply_parent: row.idreply_parent,
                reply: row.reply,
                reply_username: row.reply_username
                }
            ]
            });
        } else {
            comment.replies.push({
            idreply: row.idreply,
            idreply_parent: row.idreply_parent,
            reply: row.reply,
            reply_username: row.reply_username
            });
        }
        return acc;
        }, []);

        res.json(comments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
    }  



// Método POST para agregar una respuesta a un comentario
export const postReply = async (req, res) => {
    try {
        const { idcomment, iduser, idreply_parent, reply } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO replies (idcomment, iduser, idreply_parent, reply) VALUES (?, ?, ?, ?)",
            [idcomment, iduser, idreply_parent, reply]
        );
        res.status(201).json({ idreply: rows.insertId, idcomment, iduser, idreply_parent, reply });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

// Método GET para obtener todas las respuestas de un comentario
export const getReplies = async (req, res) => {
    try {
        const { idcomment } = req.params;
        const [rows] = await pool.query("SELECT * FROM replies WHERE idcomment = ?", [idcomment]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
}
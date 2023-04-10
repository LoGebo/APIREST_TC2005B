import { Router } from "express";
const router = Router();
import {getComments, postComment, getReplies, postReply} from "../controllers/comment.controllers.js";

//Rutas para los comentarios

router.post('/comments', postComment)

router.get('/comments', getComments )

router.post('/replies', postReply)

router.get('/replies/:idcomment', getReplies )

export default router;
import { Router } from "express";
import {getUsers, createUser, updateUser, deleteUser, getUser1, postLogin} from "../controllers/users.controllers.js";


const router = Router();

router.get("/users", getUsers)

router.get("/users/:iduser", getUser1)

router.post("/login", postLogin)

router.post("/users"  , createUser)

router.patch("/users/:iduser"  , updateUser)

router.delete("/users/:iduser"  , deleteUser)



export default router;
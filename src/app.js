import express from "express"
import userRoutes from "./routes/users.routes.js"
import indexRoutes from "./routes/index.routes.js"
import "./config.js"
import { PORT } from "./config.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use(indexRoutes)
app.use(userRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" })
})

export default app;
import express from "express"
import userRoutes from "./routes/users.routes.js"
import indexRoutes from "./routes/index.routes.js"
import "./config.js"
import { PORT } from "./config.js"

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use("/api",userRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" })
})

export default app;
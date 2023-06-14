import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
// import usersRouter from "./routes/users.js"
import boardsRouter from "./routes/boards.js"
import listsRouter from "./routes/lists.js"
import cardsRouter from "./routes/cards.js"
// import allRouter from "./routes/all.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/boards", boardsRouter)
app.use("/api/lists", listsRouter)
app.use("/api/cards", cardsRouter)

app.listen(5000, () => {
	console.log("Server listening on port 5000")
})

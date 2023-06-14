import express from "express"
import {
	createNewBoard,
	deleteBoardById,
	getBoardById,
	getBoards,
	updateBoardNameById,
	updatePositionListsBoardById,
} from "../controllers/boards.js"

const router = express.Router()

router.get("/", getBoards)
router.post("/", createNewBoard)
router.delete("/:boardId", deleteBoardById)
router.patch("/rename/:boardId", updateBoardNameById)
router.patch("/positionLists/:boardId", updatePositionListsBoardById)
router.get("/:boardId", getBoardById)

export default router

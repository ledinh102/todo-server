import express from "express"
import {
	createNewBoard,
	deleteBoardById,
	getBoardById,
	getBoards,
	getBoardsByUserId,
	updateBoardNameById,
	updatePositionListsBoardById,
} from "../controllers/boards.js"

const router = express.Router()

router.get("/", getBoards)
router.get("/user/:userId", getBoardsByUserId)
router.get("/:boardId", getBoardById)
router.post("/", createNewBoard)
router.delete("/:boardId", deleteBoardById)
router.patch("/rename/:boardId", updateBoardNameById)
router.patch("/positionLists/:boardId", updatePositionListsBoardById)

export default router

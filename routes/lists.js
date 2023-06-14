import express from "express"
import {
	archivedListById,
	createNewList,
	deleteListById,
	getListById,
	getLists,
	getListsByBoardId,
	renameListById,
} from "../controllers/lists.js"

const router = express.Router()

router.get("/", getLists)
router.post("/", createNewList)
router.delete("/:listId", deleteListById)
router.put("/archived/:listId", archivedListById)
router.put("/rename/:listId", renameListById)
router.get("/list/:listId", getListById)
router.get("/:boardId", getListsByBoardId)

export default router

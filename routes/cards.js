import express from "express"
import {
	archivedCardById,
	createNewCard,
	deleteCardById,
	getCardById,
	getCards,
	getCardsByListId,
	renameCardById,
} from "../controllers/cards.js"

const router = express.Router()

router.get("/", getCards)
router.post("/", createNewCard)
router.delete("/:cardId", deleteCardById)
router.put("/archived/:cardId", archivedCardById)
router.put("/rename/:cardId", renameCardById)
router.get("/card/:cardId", getCardById)
router.get("/:listId", getCardsByListId)

export default router

import { List, Card } from "../utils/queryDB.js"

const getCards = async (req, res) => {
	try {
		const cards = await Card.find({})
		res.json(cards)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const getCardsByListId = async (req, res) => {
	const listId = req.params.listId
	// console.log(listId)
	try {
		const cards = await Card.find({ listId: listId, isArchived: false })
		res.json(cards)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const getCardById = async (req, res) => {
	const cardId = req.params.cardId
	try {
		const card = await Card.find({ _id: cardId })
		res.json(card)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const createNewCard = async (req, res) => {
	const card = req.body
	try {
		const newCard = new Card(req.body)
		await newCard.save()
		await List.updateOne(
			{ _id: card.listId },
			{ $push: { positionCards: card._id } }
		)
		res.status(201).json({ message: "Create new card successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const deleteCardById = async (req, res) => {
	const cardId = req.params.cardId
	try {
		const card = await Card.findOne({ _id: cardId })
		await Card.deleteOne({ _id: cardId })
		await Board.updateOne(
			{ _id: card.listId },
			{ $pull: { positionCards: card._id } }
		)
		res.status(204).json({ message: "Card deleted successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const archivedCardById = async (req, res) => {
	const cardId = req.params.cardId
	// console.log(req.body)
	// console.log("archived", listId)
	try {
		await Card.updateOne({ _id: cardId }, { isArchived: true })
		res.status(200).json({ message: "Card archived successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const renameCardById = async (req, res) => {
	const cardId = req.params.cardId
	const { newCardName } = req.body
	console.log("newCardName", newCardName)
	try {
		await Card.updateOne({ _id: cardId }, { cardName: newCardName })
		res.status(200).json({ message: "Rename Card successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

export {
	getCards,
	getCardById,
	getCardsByListId,
	createNewCard,
	deleteCardById,
	archivedCardById,
	renameCardById,
}

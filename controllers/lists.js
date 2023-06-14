import { Board, List, Card } from "../utils/queryDB.js"

const getLists = async (req, res) => {
	try {
		const lists = await List.find({})
		res.json(lists)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const getListsByBoardId = async (req, res) => {
	const boardId = req.params.boardId
	try {
		const board = await Board.findOne({ _id: boardId })
		const { positionLists } = board
		const lists = await List.find({ boardId: boardId, isArchived: false })
		lists.sort((a, b) => {
			const positionA = positionLists.indexOf(a._id)
			const positionB = positionLists.indexOf(b._id)
			return positionA - positionB
		})
		// console.log("lists", lists)
		res.json(lists)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const getListById = async (req, res) => {
	const listId = req.params.listId
	try {
		const list = await List.find({ _id: listId })
		res.json(list)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const createNewList = async (req, res) => {
	const list = req.body
	try {
		const newList = new List(req.body)
		await newList.save()
		await Board.updateOne(
			{ _id: list.boardId },
			{ $push: { positionLists: list._id } }
		)
		res.status(201).json({ message: "Create new list successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const deleteListById = async (req, res) => {
	const listId = req.params.listId
	try {
		const list = await List.findOne({ _id: listId })
		await Card.deleteMany({ listId: list._id })
		await List.deleteOne({ _id: listId })
		await Board.updateOne(
			{ _id: list.boardId },
			{ $pull: { positionLists: list._id } }
		)
		res.status(204).json({ message: "Board deleted successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const archivedListById = async (req, res) => {
	const listId = req.params.listId
	// console.log(req.body)
	// console.log("archived", listId)
	try {
		await List.updateOne({ _id: listId }, { isArchived: true })
		res.status(204).json({ message: "Board deleted successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const renameListById = async (req, res) => {
	const listId = req.params.listId
	const newListName = req.body.newListName
	// console.log("rename", listId)
	try {
		await List.updateOne({ _id: listId }, { listName: newListName })
		res.status(204).json({ message: "Board deleted successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

export {
	getLists,
	getListById,
	getListsByBoardId,
	createNewList,
	deleteListById,
	archivedListById,
	renameListById,
}

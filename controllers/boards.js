import { Board } from "../utils/queryDB.js"
import { v4 as uuid } from "uuid"
const getBoards = async (req, res) => {
	try {
		const boards = await Board.find({})
		res.json(boards)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const getBoardsByUserId = async (req, res) => {
	const userId = req.params.userId
	console.log(userId)
	try {
		let boards = await Board.find({ userId: userId })
		if (boards.length === 0) {
			const newBoard = new Board({
				_id: uuid(),
				boardName: "New board",
				positionLists: [],
				userId: userId,
			})
			await newBoard.save()
			boards = await Board.find({ userId: userId })
		}
		res.json(boards)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const getBoardById = async (req, res) => {
	const boardId = req.params.boardId
	try {
		const board = await Board.findOne({ _id: boardId })
		res.json(board)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const createNewBoard = async (req, res) => {
	// console.log(req.body)
	try {
		const newBoard = new Board(req.body)
		await newBoard.save()

		const boards = await Board.find({})
		res.status(201).json(boards)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const deleteBoardById = async (req, res) => {
	const boardId = req.params.boardId
	try {
		await Board.deleteOne({ _id: boardId })
		res.status(204).json({ message: "Board deleted successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const updateBoardNameById = async (req, res) => {
	const boardId = req.params.boardId
	const board = req.body
	// console.log(req.body)
	try {
		await Board.findOneAndUpdate(
			{ _id: boardId },
			{ boardName: board.boardName }
		)
		res.status(204).json({ message: "New Board Name updated successfully" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const updatePositionListsBoardById = async (req, res) => {
	const boardId = req.params.boardId
	const { positionLists } = req.body
	// console.log("updatePositionListsBoardById", positionLists)
	try {
		await Board.findOneAndUpdate(
			{ _id: boardId },
			{ positionLists: positionLists }
		)
		res.status(204).json({
			message: "new Board position lists updated successfully",
		})
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

export {
	getBoards,
	getBoardById,
	createNewBoard,
	deleteBoardById,
	updateBoardNameById,
	updatePositionListsBoardById,
	getBoardsByUserId,
}

import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

const cardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  listId: String,
  cardName: String,
  isArchived: Boolean
})

const listSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  boardId: String,
  listName: String,
  isArchived: Boolean,
  positionCards: [String]
})

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  boardName: String,
  positionLists: [String],
  userId: String
})

const Card = mongoose.model('Card', cardSchema)
const List = mongoose.model('List', listSchema)
const Board = mongoose.model('Board', boardSchema)

export { Card, List, Board }

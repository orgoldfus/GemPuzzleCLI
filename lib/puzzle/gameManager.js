const find = require('lodash/find')
const { getRandomBoard } = require('./randomBoardGenerator')
const {
  getMovableCells,
  getBoardNextState,
  isBoardInInitialState
} = require('./utils')

class Puzzle {
  constructor(boardSize = 4) {
    if(boardSize < 3) {
      throw new Error('Board size must be bigger than 2')
    }

    this._boardSize = boardSize
    const { board, emptyCell } = getRandomBoard(boardSize)
    this._board = board
    this._emptyCell = emptyCell
    this._numOfMoves = 0
  }

  get board() {
    return this._board
  }

  get numOfMoves() {
    return this._numOfMoves
  }

  getNextAvailableMoves() {
    return getMovableCells(this._board, this._boardSize, this._emptyCell)
  }

  moveCell(cellToMove) {
    const movableCells = getMovableCells(this._board, this._boardSize, this._emptyCell)
    const isMovableCell = find(movableCells, cell => 
      cell.row === cellToMove.row && cell.col === cellToMove.col)

    if(!isMovableCell) {
      throw new Error('Invalid cell to move')
    }

    this._board = getBoardNextState(this._board, this._emptyCell, cellToMove)
    this._emptyCell = cellToMove
    this._numOfMoves++
  }

  isPuzzleSolved() {
    return isBoardInInitialState(this._board, this._boardSize)
  }
}

module.exports = Puzzle
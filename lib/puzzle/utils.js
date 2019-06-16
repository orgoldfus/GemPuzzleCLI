const map = require('lodash/map')
const EMPTY_CELL = 'X'
const DIRECTIONS = [
  { row: -1, col: 0 },
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 }
]

function getMovableCells(board, boardSize, emptyPos) {
  const movableCells = {}

  for (let direction of DIRECTIONS) {
    const row = emptyPos.row + direction.row
    const col = emptyPos.col + direction.col

    if (row >= 0 && row < boardSize && 
      col >= 0 && col < boardSize) {
      const value = parseFloat(board[row][col])
      movableCells[value] = { row, col }
    }
  }

  return movableCells
}

function getBoardNextState(board, emptyCell, cellToMove) {
  const cellToMoveVal = board[cellToMove.row][cellToMove.col]
  return map(board, (row, rowNum) => row.map((cell, colNum) => {
    if (rowNum === emptyCell.row && colNum === emptyCell.col) {
      return cellToMoveVal
    } else if (rowNum === cellToMove.row && colNum === cellToMove.col) {
      return EMPTY_CELL
    } else {
      return cell
    }
  }))
}

function isBoardInInitialState(board, boardSize) {
  if(board[boardSize - 1][boardSize - 1] !== EMPTY_CELL) {
    return false
  }

  let prevCell = 0

  for (let row of board) {
    for(let cell of row) {
      if(cell < prevCell) {
        return false
      }
      prevCell = cell
    }
  }

  return true
}

module.exports = {
  EMPTY_CELL,
  getMovableCells,
  getBoardNextState,
  isBoardInInitialState
}
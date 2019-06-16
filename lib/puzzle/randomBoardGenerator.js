const map = require('lodash/map')
const flatten = require('lodash/flatten')
const { EMPTY_CELL } = require('./utils')

function initBoard(boardSize) {
  let emptyCell

  const availabeCells = Array.apply(null, {
    length: boardSize * boardSize
  }).map(Number.call, Number)

  const board = map(Array(boardSize).fill(Array(boardSize)), 
    (row, rowNum) => map(row, (_, colNum) => {
      const randomIdx = Math.floor((Math.random() * availabeCells.length))
      const cell = availabeCells[randomIdx]
      availabeCells.splice(randomIdx, 1)

      if(cell === 0) {
        emptyCell = { row: rowNum, col: colNum }
        return EMPTY_CELL
      }

      return cell
    }))
    
  return { board, emptyCell }
}

function countInversions(board, row, col) {
  const flatBoard = flatten(board)
  const tileIdx = (row * board.length) + col
  const tile = flatBoard[tileIdx]
  let inversions = 0

  for(let i = tileIdx + 1; i < flatBoard.length; i++) {
    if(flatBoard[i] !== EMPTY_CELL && flatBoard[i] < tile) {
      inversions++
    }
  }

  return inversions
}

function sumOfInversions(board) {
  let sum = 0

  for(let row = 0; row < board.length; row++) {
    for(let col = 0; col < board[row].length; col++) {
      if(board[row][col] !== EMPTY_CELL) {
        sum += countInversions(board, row, col)
      }
    }
  }

  return sum
}

// Algorithm is based on https://cseweb.ucsd.edu/~ccalabro/essays/15_puzzle.pdf
function isBoardSolvable(board, emptyCell) {
  if (board[0].length % 2 == 1) {
    return (sumOfInversions(board) % 2 == 0)
  } else {
    return ((sumOfInversions(board) + board.length - emptyCell.row + 1) % 2 == 0)
  }
}

function swapCells(board, first, second) {
  const temp = board[first.row][first.col]
  board[first.row][first.col] = board[second.row][second.col]
  board[second.row][second.col] = temp
}

function getRandomBoard(boardSize) {
  const { board, emptyCell } = initBoard(boardSize)

  if (!isBoardSolvable(board, emptyCell)) {
    if (emptyCell.row === 0 && emptyCell.col <= 1) {
      swapCells(board, { row: boardSize - 1, col: boardSize - 2}, 
        { row: boardSize - 1, col: boardSize - 1})
    } else {
      swapCells(board, { row: 0, col: 0 }, { row: 0, col: 1 })
    }
  }

  return { board, emptyCell }
}

module.exports = {
  getRandomBoard,
  isBoardSolvable,
  sumOfInversions
}
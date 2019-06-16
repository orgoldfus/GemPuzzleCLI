#!/usr/bin/env node -r top-level-await
const { Puzzle } = require('./lib/puzzle')
const ui = require('./lib/cli')

ui.printGameStartMsg()
const boardSize = await ui.getBoardSize()
const puzzle = new Puzzle(boardSize)

do {
  ui.printBoard(puzzle.board)
  const avaialbleMoves = puzzle.getNextAvailableMoves()
  const cellToMove = await ui.getNextMove(avaialbleMoves)
  puzzle.moveCell(cellToMove)
} while (!puzzle.isPuzzleSolved())

ui.printWinMessage(puzzle.numOfMoves)

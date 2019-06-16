/* global console */
/* eslint-disable no-console */
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const { EMPTY_CELL } = require('./puzzle')
const prompt = inquirer.createPromptModule()

function printGameStartMsg() {
  console.clear()
  console.log(chalk.cyan(figlet.textSync('Puzzle 15')))
}

async function getBoardSize() {
  const answer = await prompt({
    type: 'input',
    name: 'boardSize',
    message: 'Please enter the required board size:',
    default: 4,
    validate: (value) => {
      const parsed = parseFloat(value)
      const valid = !isNaN(parsed) && parsed > 2
      return valid || 'Please enter a number that is greater than 2'
    },
    filter: Number
  })

  return answer.boardSize
}

async function getNextMove(movableCells) {
  const answer = await prompt(    {
    type: 'list',
    name: 'cellValue',
    message: 'Which cell would you like to move next?',
    choices: Object.keys(movableCells),
    filter: function(value) {
      return parseFloat(value)
    }
  })
  return movableCells[answer.cellValue]
}

function printBoard(board) {
  const boardSize = board.length
  const maxCellSize = ((boardSize * boardSize) - 1).toString().length + 2
  const ceilingSegment = maxCellSize - 2 < 3 ? 3 : maxCellSize
  const ceiling = 
  ` ${chalk.yellow('-').repeat(ceilingSegment)}${maxCellSize % 2 > 0 ? '' : ' '}`
    .repeat(boardSize)
  console.clear()
  
  for (let row of board) {
    const rowStr = row.map(cell => {
      const cellLength = cell.toString().length
      const padding = maxCellSize > 1 ? (maxCellSize - cellLength) / 2 + cellLength : 0
      return `${chalk.yellow('|')}${chalk.green(
        (cell === EMPTY_CELL ? ' ' : cell).toString().padStart(padding).padEnd(maxCellSize)
      )}`
    }).join('') + chalk.yellow('|')

    console.log(ceiling)
    console.log(rowStr)
  }
  console.log(ceiling)
}

function printWinMessage(numOfMoves) {
  console.clear()
  console.log(chalk.magenta(figlet.textSync('Congratulations!')))
  console.log(chalk.magenta(`you solved the puzzle in ${numOfMoves} moves!`))
}

module.exports = {
  getBoardSize,
  getNextMove,
  printBoard,
  printWinMessage,
  printGameStartMsg
}
const { EMPTY_CELL } = require('../../lib/puzzle/utils')
const {
  isBoardSolvable,
  sumOfInversions
} = require('../../lib/puzzle/randomBoardGenerator')

describe('sumOfInversions', () => {
  it('Returns 0 when board is in intialized state', () => {
    const board = [[1, 2, 3], [4, 5, 6], [7, 8, EMPTY_CELL]]

    expect(sumOfInversions(board)).toBe(0)
  })

  it('Returns correct number of inversions', () => {
    const board = [[7, 4, 3], [EMPTY_CELL, 5, 8], [6, 2, 1]]

    expect(sumOfInversions(board)).toBe(19)
  })
})

describe('isBoardSolvable', () => {
  describe('Board width is odd', () => {
    it('Returns false when sumOfInversions is odd', () => {
      const board = [[1, 2, 3], [4, 5, 6], [8, 7, EMPTY_CELL]]
      
      expect(isBoardSolvable(board)).toBeFalsy()
    })

    it('Returns true when sumOfInversions is even', () => {
      const board = [[1, 2, 3], [4, 6, 5], [8, 7, EMPTY_CELL]]
      
      expect(isBoardSolvable(board)).toBeTruthy()
    })
  })
  
  describe('Board width is even', () => {
    it('Returns true if polarity is even when empty cell is in the last row', () => {
      const board = [[8, 13, 1, 4], [2, 14, EMPTY_CELL, 5], [3, 12, 10, 7], [11, 6, 9, 15]]
      const emptyCell = { row: 1, col: 2 }

      expect(isBoardSolvable(board, emptyCell)).toBeTruthy()
    })

    it('Returns false if polarity is odd when empty cell is in the last row', () => {
      const board = [[13, 8, 1, 4], [2, 14, EMPTY_CELL, 5], [3, 12, 10, 7], [11, 6, 9, 15]]
      const emptyCell = { row: 1, col: 2 }

      expect(isBoardSolvable(board, emptyCell)).toBeFalsy()
    })
  })
})

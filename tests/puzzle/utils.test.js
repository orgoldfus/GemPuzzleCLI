const {
  EMPTY_CELL,
  getMovableCells,
  getBoardNextState,
  isBoardInInitialState
} = require('../../lib/puzzle/utils')

describe('getMovableCells', () => {
  it('Returns a list of movable cells', () => {
    const board = [[1, 2, 3], [4, 5, 6], [7, 8, EMPTY_CELL]]
    const expected = { 
      8: { row: 2, col: 1 }, 
      6: { row: 1, col: 2 } 
    }

    const movableCells = getMovableCells(board, 3, { row: 2, col: 2 })

    expect(movableCells).toEqual(expected)
  })

  it('Return 2 options when emtpy cell is in corner', () => {
    const board = [[1, 2, EMPTY_CELL], [4, 5, 6], [7, 8, 9]]
    const expected = { 
      2: { row: 0, col: 1 }, 
      6: { row: 1, col: 2 } 
    }

    const movableCells = getMovableCells(board, 3, { row: 0, col: 2 })

    expect(movableCells).toEqual(expected)
  })

  it('Return 3 options when emtpy cell is periferial', () => {
    const board = [[1, 2, 3], [4, 5, EMPTY_CELL], [7, 8, 9]]
    const expected = { 
      3: { row: 0, col: 2 },
      5: { row: 1, col: 1 },
      9: { row: 2, col: 2 } 
    }

    const movableCells = getMovableCells(board, 3, { row: 1, col: 2 })

    expect(movableCells).toEqual(expected)
  })

  it('Return 4 options when emtpy cell is internal', () => {
    const board = [[1, 2, 3], [4, EMPTY_CELL, 6], [7, 8, 9]]
    const expected = { 
      2: { row: 0, col: 1 },
      4: { row: 1, col: 0 },
      6: { row: 1, col: 2 },
      8: { row: 2, col: 1 } 
    }

    const movableCells = getMovableCells(board, 3, { row: 1, col: 1 })

    expect(movableCells).toEqual(expected)
  })
})

describe('getBoardNextState', () => {
  it('Doesn\'t change the input board', () => {
    const board = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]

    const updatedBoard = getBoardNextState(board, {}, { row: 2, col: 4 })

    expect(updatedBoard).toEqual(board)
    expect(updatedBoard).not.toBe(board)
  })

  it('Switching between cellToMove and empty cell', () => {
    const board = [[1, EMPTY_CELL, 1], [1, 9, 1], [1, 1, 1]]
    const expected = [[1, 9, 1], [1, EMPTY_CELL, 1], [1, 1, 1]]
    const cellToMove = { row: 1, col: 1 }
    const emptyCell = { row: 0, col: 1 }

    const updatedBoard = getBoardNextState(board, emptyCell, cellToMove)

    expect(updatedBoard).toEqual(expected)
  })

  it('Does\'t change any other cell', () => {
    const board = [[1, 2, 3], [4, 5, 6], [7, 8, EMPTY_CELL]]
    const expected = [[1, 2, 3], [4, 5, 6], [7, EMPTY_CELL, 8]]
    const cellToMove = { row: 2, col: 1 }
    const emptyCell = { row: 2, col: 2 }

    const updatedBoard = getBoardNextState(board, emptyCell, cellToMove)

    expect(updatedBoard).toEqual(expected)
  })
})

describe('isBoardInInitialState', () => {
  describe('Last cell is not an empty cell', () => {
    it('Returns false', () => {
      const board = [[1, 2, 3], [4, 5, 6], [7, EMPTY_CELL, 8]]
      
      const isInInitState = isBoardInInitialState(board, 3)

      expect(isInInitState).toBeFalsy()
    })
  })

  describe('Cells aren\'t arranged in order', () => {
    it('Returns false', () => {
      const board = [[1, 2, 3], [4, 5, 6], [8, 7, EMPTY_CELL]]
      
      const isInInitState = isBoardInInitialState(board, 3)

      expect(isInInitState).toBeFalsy()
    })
  })

  describe('Board is in initial state', () => {
    it('Returns true', () => {
      const board = [[1, 2, 3], [4, 5, 6], [7, 8, EMPTY_CELL]]
      
      const isInInitState = isBoardInInitialState(board, 3)

      expect(isInInitState).toBeTruthy()
    })
  })
})
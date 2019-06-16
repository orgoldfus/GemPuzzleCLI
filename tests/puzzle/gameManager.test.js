const Puzzle = require('../../lib/puzzle/gameManager')

describe('Puzzle', () => {
  describe('constructor', () => {
    it('Sets board size to 4 if none is passed', () => {
      const game = new Puzzle()

      expect(game._boardSize).toBe(4)
    })

    it('Throws if received boardSize is lower than 3', () => {
      try {
        new Puzzle(1)
        throw new Error('Constructor should have thrown an error')
      } catch (err){
        expect(err).toBeInstanceOf(Error)
      }
    })

    it('Initializes numOfMoves', () => {
      const game = new Puzzle()

      expect(game._numOfMoves).toBe(0)
    })

    it('Initializes the empty cell pointer', () => {
      const game = new Puzzle(3)

      expect(game._emptyCell).toBeDefined()
    })
  })
})
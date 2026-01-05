import { useState } from 'react'
import { motion } from 'framer-motion'

const TicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const calculateWinner = (squares: (string | null)[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
    
    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner('Draw')
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-3xl font-bold text-white mb-4">Tic Tac Toe</h3>
      
      <div className="text-xl text-gray-300 mb-4">
        {winner ? (
          <span className="text-gradient font-bold">
            {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
          </span>
        ) : (
          <span>Player {isXNext ? 'X' : 'O'}'s Turn</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white/10 p-4 rounded-lg">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
            className="w-20 h-20 md:w-24 md:h-24 bg-dark-secondary border-2 border-white/20 rounded-lg text-3xl md:text-4xl font-bold text-white disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            whileHover={!cell && !winner ? { scale: 1.1 } : {}}
            whileTap={!cell && !winner ? { scale: 0.9 } : {}}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={resetGame}
        className="px-6 py-3 rounded-full bg-gradient-iridescent text-white font-semibold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Reset Game
      </motion.button>
    </div>
  )
}

export default TicTacToe


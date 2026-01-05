import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CARD_PAIRS = ['🎮', '🎯', '🎲', '🎨', '🎪', '🎭', '🎸', '🎺']

const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffled = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)
      const [first, second] = newFlipped

      if (cards[first] === cards[second]) {
        setMatched(prev => [...prev, first, second])
        setFlipped([])

        if (matched.length + 2 === cards.length) {
          setTimeout(() => setGameWon(true), 500)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-3xl font-bold text-white mb-4">Memory Cards</h3>
      
      <div className="text-xl text-gray-300 mb-4">
        <span>Moves: <span className="text-gradient font-bold">{moves}</span></span>
        {gameWon && <span className="ml-4 text-gradient font-bold">You Won! 🎉</span>}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index)
          
          return (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              disabled={isFlipped || gameWon}
              className="w-16 h-16 md:w-20 md:h-20 bg-dark-secondary border-2 border-white/20 rounded-lg text-3xl md:text-4xl flex items-center justify-center disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              whileHover={!isFlipped && !gameWon ? { scale: 1.1 } : {}}
              whileTap={!isFlipped && !gameWon ? { scale: 0.9 } : {}}
            >
              {isFlipped ? card : '?'}
            </motion.button>
          )
        })}
      </div>

      <motion.button
        onClick={initializeGame}
        className="px-6 py-3 rounded-full bg-gradient-iridescent text-white font-semibold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {gameWon ? 'Play Again' : 'Reset Game'}
      </motion.button>
    </div>
  )
}

export default MemoryGame


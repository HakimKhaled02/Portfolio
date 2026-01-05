import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TicTacToe from './games/TicTacToe'
import MazeGame from './games/MazeGame'
import MemoryGame from './games/MemoryGame'
import { FaTimes } from 'react-icons/fa'

const Arcade = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games = [
    { 
      id: 'tictactoe', 
      name: 'Tic Tac Toe', 
      component: TicTacToe, 
      description: 'Classic X and O game',
      bgImage: '/images/11151414.jpg'
    },
    { 
      id: 'maze', 
      name: 'Maze Game', 
      component: MazeGame, 
      description: 'Escape the maze',
      bgImage: '/images/4733693.jpg'
    },
    { 
      id: 'memory', 
      name: 'Memory Cards', 
      component: MemoryGame, 
      description: 'Match pairs of cards',
      bgImage: '/images/memorycard.jpg'
    },
  ]

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId)
  }

  const handleCloseGame = () => {
    setSelectedGame(null)
  }

  const SelectedGameComponent = selectedGame 
    ? games.find(g => g.id === selectedGame)?.component 
    : null

  return (
    <section id="arcade" className="py-20 px-6 relative min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-center"
          >
            Game <span className="text-gradient">Arcade</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-center mb-12 text-lg"
          >
            Take a break and enjoy some fun games!
          </motion.p>

          {!selectedGame ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden aspect-square flex items-center justify-center max-w-xs w-full"
                  onClick={() => handleGameSelect(game.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(${game.bgImage})` }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg shadow-black">{game.name}</h3>
                    <p className="text-gray-200 drop-shadow-md shadow-black">{game.description}</p>
                    <motion.button
                      className="px-6 py-2 rounded-full bg-gradient-iridescent text-white font-semibold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Play Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect rounded-2xl p-6 md:p-8 relative"
            >
              <button
                onClick={handleCloseGame}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
              {SelectedGameComponent && <SelectedGameComponent />}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Arcade


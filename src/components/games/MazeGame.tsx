import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const MAZE_SIZE = 15
const CELL_SIZE = 25
const PLAYER_SPEED = 0.15
const ENEMY_SPEED = 0.08 // Slower enemy speed

// Simple maze layout (1 = wall, 0 = path)
const generateMaze = (): number[][] => {
  const maze: number[][] = Array(MAZE_SIZE).fill(null).map(() => Array(MAZE_SIZE).fill(1))
  
  // Create paths using a simple algorithm
  for (let i = 1; i < MAZE_SIZE - 1; i++) {
    for (let j = 1; j < MAZE_SIZE - 1; j++) {
      if (i % 2 === 1 && j % 2 === 1) {
        maze[i][j] = 0 // Open cell
      } else if (Math.random() > 0.3) {
        maze[i][j] = 0 // Random paths
      }
    }
  }
  
  // Ensure start and end are open
  maze[1][1] = 0 // Start
  maze[MAZE_SIZE - 2][MAZE_SIZE - 2] = 0 // End
  
  // Ensure there's a path from start to end
  for (let i = 1; i < MAZE_SIZE - 1; i++) {
    maze[i][1] = 0
    maze[MAZE_SIZE - 2][i] = 0
  }
  
  return maze
}

interface Position {
  x: number
  y: number
}

const MazeGame = () => {
  const [maze, setMaze] = useState<number[][]>(generateMaze())
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 })
  const [enemyPos, setEnemyPos] = useState<Position>({ x: MAZE_SIZE - 2, y: MAZE_SIZE - 2 })
  const [enemy2Pos, setEnemy2Pos] = useState<Position>({ x: MAZE_SIZE - 2, y: 1 })
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})
  const animationFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(Date.now())
  const playerPosRef = useRef<Position>({ x: 1, y: 1 })
  const enemyPosRef = useRef<Position>({ x: MAZE_SIZE - 2, y: MAZE_SIZE - 2 })
  const enemy2PosRef = useRef<Position>({ x: MAZE_SIZE - 2, y: 1 })

  const isValidMove = (x: number, y: number, mazeData: number[][]): boolean => {
    if (x < 0 || x >= MAZE_SIZE || y < 0 || y >= MAZE_SIZE) return false
    return mazeData[Math.floor(y)][Math.floor(x)] === 0
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    const arrowKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']
    const wasdKeys = ['w', 'a', 's', 'd']
    
    // Prevent default behavior for arrow keys and WASD to avoid page scrolling
    if (arrowKeys.includes(key) || wasdKeys.includes(key) || e.key.startsWith('Arrow')) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Normalize arrow keys
    let normalizedKey = key
    if (e.key === 'ArrowUp') normalizedKey = 'arrowup'
    else if (e.key === 'ArrowDown') normalizedKey = 'arrowdown'
    else if (e.key === 'ArrowLeft') normalizedKey = 'arrowleft'
    else if (e.key === 'ArrowRight') normalizedKey = 'arrowright'
    
    setKeys(prev => ({ ...prev, [normalizedKey]: true }))
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    const arrowKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']
    const wasdKeys = ['w', 'a', 's', 'd']
    
    // Prevent default behavior for arrow keys and WASD
    if (arrowKeys.includes(key) || wasdKeys.includes(key) || e.key.startsWith('Arrow')) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Normalize arrow keys
    let normalizedKey = key
    if (e.key === 'ArrowUp') normalizedKey = 'arrowup'
    else if (e.key === 'ArrowDown') normalizedKey = 'arrowdown'
    else if (e.key === 'ArrowLeft') normalizedKey = 'arrowleft'
    else if (e.key === 'ArrowRight') normalizedKey = 'arrowright'
    
    setKeys(prev => ({ ...prev, [normalizedKey]: false }))
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  const gameLoop = useCallback(() => {
    if (gameOver || gameWon) return

    const now = Date.now()
    const deltaTime = Math.min((now - lastTimeRef.current) / 16, 2)
    lastTimeRef.current = now

    // Update player position
    let newPlayerX = playerPosRef.current.x
    let newPlayerY = playerPosRef.current.y

    if (keys['w'] || keys['arrowup']) {
      newPlayerY -= PLAYER_SPEED * deltaTime
      if (!isValidMove(newPlayerX, newPlayerY, maze)) {
        newPlayerY = playerPosRef.current.y
      }
    }
    if (keys['s'] || keys['arrowdown']) {
      newPlayerY += PLAYER_SPEED * deltaTime
      if (!isValidMove(newPlayerX, newPlayerY, maze)) {
        newPlayerY = playerPosRef.current.y
      }
    }
    if (keys['a'] || keys['arrowleft']) {
      newPlayerX -= PLAYER_SPEED * deltaTime
      if (!isValidMove(newPlayerX, newPlayerY, maze)) {
        newPlayerX = playerPosRef.current.x
      }
    }
    if (keys['d'] || keys['arrowright']) {
      newPlayerX += PLAYER_SPEED * deltaTime
      if (!isValidMove(newPlayerX, newPlayerY, maze)) {
        newPlayerX = playerPosRef.current.x
      }
    }

    // Snap to grid for collision
    const playerGridX = Math.floor(newPlayerX)
    const playerGridY = Math.floor(newPlayerY)
    
    if (isValidMove(playerGridX, playerGridY, maze)) {
      playerPosRef.current = { x: newPlayerX, y: newPlayerY }
      setPlayerPos(playerPosRef.current)
    }

    // Check if player reached the end
    if (playerGridX >= MAZE_SIZE - 2 && playerGridY >= MAZE_SIZE - 2) {
      setGameWon(true)
      return
    }

    // Enemy 1 AI - chase player
    const dx1 = playerPosRef.current.x - enemyPosRef.current.x
    const dy1 = playerPosRef.current.y - enemyPosRef.current.y
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)

    if (distance1 > 0.1) {
      let newEnemyX = enemyPosRef.current.x
      let newEnemyY = enemyPosRef.current.y

      // Move towards player
      const moveX = (dx1 / distance1) * ENEMY_SPEED * deltaTime
      const moveY = (dy1 / distance1) * ENEMY_SPEED * deltaTime

      newEnemyX += moveX
      newEnemyY += moveY

      // Check if enemy can move to new position
      const enemyGridX = Math.floor(newEnemyX)
      const enemyGridY = Math.floor(newEnemyY)

      if (isValidMove(enemyGridX, enemyGridY, maze)) {
        enemyPosRef.current = { x: newEnemyX, y: newEnemyY }
        setEnemyPos(enemyPosRef.current)
      } else {
        // Try alternative paths
        if (isValidMove(enemyGridX + (moveX > 0 ? 1 : -1), enemyGridY, maze)) {
          enemyPosRef.current.x += moveX > 0 ? ENEMY_SPEED * deltaTime : -ENEMY_SPEED * deltaTime
          setEnemyPos(enemyPosRef.current)
        } else if (isValidMove(enemyGridX, enemyGridY + (moveY > 0 ? 1 : -1), maze)) {
          enemyPosRef.current.y += moveY > 0 ? ENEMY_SPEED * deltaTime : -ENEMY_SPEED * deltaTime
          setEnemyPos(enemyPosRef.current)
        }
      }
    }

    // Enemy 2 AI - chase player
    const dx2 = playerPosRef.current.x - enemy2PosRef.current.x
    const dy2 = playerPosRef.current.y - enemy2PosRef.current.y
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

    if (distance2 > 0.1) {
      let newEnemy2X = enemy2PosRef.current.x
      let newEnemy2Y = enemy2PosRef.current.y

      // Move towards player
      const moveX2 = (dx2 / distance2) * ENEMY_SPEED * deltaTime
      const moveY2 = (dy2 / distance2) * ENEMY_SPEED * deltaTime

      newEnemy2X += moveX2
      newEnemy2Y += moveY2

      // Check if enemy can move to new position
      const enemy2GridX = Math.floor(newEnemy2X)
      const enemy2GridY = Math.floor(newEnemy2Y)

      if (isValidMove(enemy2GridX, enemy2GridY, maze)) {
        enemy2PosRef.current = { x: newEnemy2X, y: newEnemy2Y }
        setEnemy2Pos(enemy2PosRef.current)
      } else {
        // Try alternative paths
        if (isValidMove(enemy2GridX + (moveX2 > 0 ? 1 : -1), enemy2GridY, maze)) {
          enemy2PosRef.current.x += moveX2 > 0 ? ENEMY_SPEED * deltaTime : -ENEMY_SPEED * deltaTime
          setEnemy2Pos(enemy2PosRef.current)
        } else if (isValidMove(enemy2GridX, enemy2GridY + (moveY2 > 0 ? 1 : -1), maze)) {
          enemy2PosRef.current.y += moveY2 > 0 ? ENEMY_SPEED * deltaTime : -ENEMY_SPEED * deltaTime
          setEnemy2Pos(enemy2PosRef.current)
        }
      }
    }

    // Check collision with enemy 1
    const collisionDistance1 = Math.sqrt(
      (playerPosRef.current.x - enemyPosRef.current.x) ** 2 +
      (playerPosRef.current.y - enemyPosRef.current.y) ** 2
    )

    // Check collision with enemy 2
    const collisionDistance2 = Math.sqrt(
      (playerPosRef.current.x - enemy2PosRef.current.x) ** 2 +
      (playerPosRef.current.y - enemy2PosRef.current.y) ** 2
    )

    if (collisionDistance1 < 0.8 || collisionDistance2 < 0.8) {
      setGameOver(true)
      return
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [gameOver, gameWon, keys, maze])

  useEffect(() => {
    if (!gameOver && !gameWon) {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameOver, gameWon, gameLoop])

  const resetGame = () => {
    const newMaze = generateMaze()
    setMaze(newMaze)
    const newPlayerPos = { x: 1, y: 1 }
    const newEnemyPos = { x: MAZE_SIZE - 2, y: MAZE_SIZE - 2 }
    const newEnemy2Pos = { x: MAZE_SIZE - 2, y: 1 }
    playerPosRef.current = newPlayerPos
    enemyPosRef.current = newEnemyPos
    enemy2PosRef.current = newEnemy2Pos
    setPlayerPos(newPlayerPos)
    setEnemyPos(newEnemyPos)
    setEnemy2Pos(newEnemy2Pos)
    setGameOver(false)
    setGameWon(false)
    lastTimeRef.current = Date.now()
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-3xl font-bold text-white mb-2">🏴‍☠️ Pirate Maze Adventure 🏴‍☠️</h3>
      <p className="text-yellow-300 text-lg font-semibold mb-4">Help the Pirate find the Treasure!</p>
      
      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl text-gradient font-bold"
        >
          🎉 Treasure Found! You Win! 🎉
        </motion.div>
      )}

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl text-red-400 font-bold"
        >
          ☠️ Captured by Sea Monsters! Game Over ☠️
        </motion.div>
      )}

      {/* Maze */}
      <div className="relative border-4 border-amber-600 rounded-lg p-4 shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 100%)' }}>
        <div
          style={{
            width: MAZE_SIZE * CELL_SIZE,
            height: MAZE_SIZE * CELL_SIZE,
            position: 'relative',
            backgroundImage: 'url(/images/4733693.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for better visibility */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'rgba(135, 206, 235, 0.3)' // Light blue overlay for better contrast
            }}
          />
          {/* Maze walls and paths */}
          {maze.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  position: 'absolute',
                  left: j * CELL_SIZE,
                  top: i * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: cell === 1 ? '#8B4513' : '#FFD700', // Brown walls, gold/yellow paths
                  border: cell === 1 ? '2px solid #654321' : 'none',
                  borderRadius: cell === 0 ? '2px' : '0px',
                  boxShadow: cell === 0 ? 'inset 0 0 5px rgba(255, 215, 0, 0.3)' : 'none',
                  zIndex: 10
                }}
              />
            ))
          )}

          {/* Treasure Chest (Exit) */}
          <div
            style={{
              position: 'absolute',
              left: (MAZE_SIZE - 2) * CELL_SIZE,
              top: (MAZE_SIZE - 2) * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 15
            }}
          >
            <div className="text-3xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}>
              💎
            </div>
          </div>

          {/* Player (Pirate) */}
          <motion.div
            className="absolute rounded-full border-2 border-white shadow-lg z-20 flex items-center justify-center"
            style={{
              width: CELL_SIZE * 0.8,
              height: CELL_SIZE * 0.8,
              left: playerPos.x * CELL_SIZE + CELL_SIZE * 0.1,
              top: playerPos.y * CELL_SIZE + CELL_SIZE * 0.1,
              backgroundColor: '#8B4513',
            }}
            animate={{
              x: 0,
              y: 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="text-xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}>
              🏴‍☠️
            </div>
          </motion.div>

          {/* Enemy 1 (Sea Monster) */}
          <motion.div
            className="absolute rounded-full border-2 border-white shadow-lg z-20 flex items-center justify-center"
            style={{
              width: CELL_SIZE * 0.8,
              height: CELL_SIZE * 0.8,
              left: enemyPos.x * CELL_SIZE + CELL_SIZE * 0.1,
              top: enemyPos.y * CELL_SIZE + CELL_SIZE * 0.1,
              backgroundColor: '#1a1a2e',
            }}
            animate={{
              x: 0,
              y: 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="text-xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}>
              🦑
            </div>
          </motion.div>

          {/* Enemy 2 (Sea Monster) */}
          <motion.div
            className="absolute rounded-full border-2 border-white shadow-lg z-20 flex items-center justify-center"
            style={{
              width: CELL_SIZE * 0.8,
              height: CELL_SIZE * 0.8,
              left: enemy2Pos.x * CELL_SIZE + CELL_SIZE * 0.1,
              top: enemy2Pos.y * CELL_SIZE + CELL_SIZE * 0.1,
              backgroundColor: '#2d1b3d',
            }}
            animate={{
              x: 0,
              y: 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="text-xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}>
              🦈
            </div>
          </motion.div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center space-y-2 bg-amber-50/10 rounded-lg p-4 border-2 border-amber-600/30">
        <p className="text-yellow-200 font-semibold text-lg">⚓ Pirate's Guide ⚓</p>
        <p className="text-white text-sm">🏴‍☠️ Use WASD or Arrow Keys to navigate</p>
        <p className="text-yellow-300 text-sm font-semibold">💎 Find the Treasure Chest to win!</p>
        <p className="text-red-300 text-sm">🦑🦈 Avoid the sea monsters chasing you!</p>
      </div>

      {/* Reset Button */}
      <motion.button
        onClick={resetGame}
        className="px-6 py-3 rounded-full bg-gradient-iridescent text-white font-semibold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {gameOver || gameWon ? 'Play Again' : 'Reset Game'}
      </motion.button>
    </div>
  )
}

export default MazeGame


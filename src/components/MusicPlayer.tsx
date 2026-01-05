import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaPause, FaMusic, FaTimes } from 'react-icons/fa'

interface Song {
  id: number
  title: string
  artist: string
  url: string
}

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sample songs - replace with your actual music files
  const songs: Song[] = [
    {
      id: 1,
      title: 'Ambient Background',
      artist: 'Nature Sounds',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      id: 2,
      title: 'Relaxing Music',
      artist: 'Chill Vibes',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      id: 3,
      title: 'Focus Music',
      artist: 'Productivity',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0)
      })
    }
  }, [currentSong])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const selectSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay()
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.src = song.url
        audioRef.current.play()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <>
      {/* Music Player Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-iridescent flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaMusic className="text-xl" />
      </motion.button>

      {/* Music Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-dark-secondary glass-effect rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Music Player</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Current Song Info */}
            {currentSong && (
              <div className="mb-4">
                <p className="text-white font-medium">{currentSong.title}</p>
                <p className="text-gray-400 text-sm">{currentSong.artist}</p>
              </div>
            )}

            {/* Audio Controls */}
            {currentSong && (
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-iridescent-blue"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-gradient-iridescent flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
              </div>
            )}

            {/* Song List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {songs.map((song) => (
                <motion.button
                  key={song.id}
                  onClick={() => selectSong(song)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSong?.id === song.id
                      ? 'bg-gradient-iridescent text-white'
                      : 'bg-dark-tertiary text-gray-300 hover:bg-dark-tertiary/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs opacity-75">{song.artist}</p>
                </motion.button>
              ))}
            </div>

            {/* Hidden Audio Element */}
            {currentSong && (
              <audio
                ref={audioRef}
                src={currentSong.url}
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MusicPlayer


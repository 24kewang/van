import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import StickyNote from './StickyNote'
import MouseIcon from './MouseIcon'

const AnimatedStickyNote = ({
  children,
  imageUrl,
}: {
  children: React.ReactNode
  imageUrl: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row items-center justify-center md:space-x-12"
    >
      <div className="w-80">
        <StickyNote>{children}</StickyNote>
      </div>
      <img
        src={imageUrl}
        alt="placeholder"
        className="w-80 h-80 rounded-lg shadow-lg mt-8 md:mt-0"
      />
    </motion.div>
  )
}

const getButtonMessage = (
  buttonType: 'yes' | 'no',
  lastClicked: 'yes' | 'no' | null,
  clickCount: number
): string => {
  if (clickCount === 1) {
    if (buttonType === 'yes') {
      return 'A good sign! Click again to confirm.'
    } else {
      return 'Oh... okay.'
    }
  }

  if (clickCount === 2) {
    if (buttonType === 'yes') {
      if (lastClicked === 'yes') {
        return 'So eager! One more time to be sure.'
      } else {
        return 'Changed your mind? Click again to confirm.'
      }
    } else {
      if (lastClicked === 'no') {
        return 'Still no? Are you sure?'
      } else {
        return 'Having second thoughts? Are you sure?'
      }
    }
  }

  return ''
}

function App() {
  const [clickCount, setClickCount] = useState(0)
  const [lastClicked, setLastClicked] = useState<'yes' | 'no' | null>(null)
  const [message, setMessage] = useState('')
  const [showMouseIcon, setShowMouseIcon] = useState(true)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowMouseIcon(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleButtonClick = (buttonType: 'yes' | 'no') => {
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)

    if (newClickCount < 3) {
      setMessage(getButtonMessage(buttonType, lastClicked, newClickCount))
      setLastClicked(buttonType)
    } else {
      if (buttonType === 'yes') {
        navigate('/yes')
      } else {
        navigate('/no')
      }
    }
  }

  return (
    <div className="bg-black text-pink-500 min-h-screen font-sans p-4">
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-5xl md:text-7xl font-bold text-center"
        >
          I have a question for you...
        </motion.h1>
        <AnimatePresence>
          {showMouseIcon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 20, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="absolute bottom-10"
            >
              <MouseIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl="https://picsum.photos/seed/1/400/400">
          <p className="text-2xl">This is a sticky note.</p>
        </AnimatedStickyNote>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl="https://picsum.photos/seed/2/400/400">
          <p className="text-2xl">This is another sticky note.</p>
        </AnimatedStickyNote>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl="https://picsum.photos/seed/3/400/400">
          <p className="text-2xl">And one more!</p>
        </AnimatedStickyNote>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-4xl md:text-5xl mb-8 text-center">The final question...</h2>
        {message && <p className="text-2xl md:text-3xl mb-8 h-10 text-center">{message}</p>}
        <div className="flex space-x-8">
          <button
            onClick={() => handleButtonClick('yes')}
            className="bg-pink-500 text-black px-8 py-4 rounded-lg text-2xl font-bold"
          >
            Yes
          </button>
          <button
            onClick={() => handleButtonClick('no')}
            className="bg-purple-500 text-black px-8 py-4 rounded-lg text-2xl font-bold"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

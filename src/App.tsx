import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import StickyNote from './StickyNote'
import MouseIcon from './MouseIcon'
import food from './assets/food.jpg'
import me from './assets/me.jpg'
import me_nice from './assets/me_nice.jpg'
import smart from './assets/smart.jpg'
import trumpet from './assets/trumpet.jpg'

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
      className="flex flex-col md:flex-row items-center justify-center md:space-x-12 w-full px-4 md:px-8 max-w-6xl mx-auto mb-16 md:mb-24"
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <StickyNote>{children}</StickyNote>
      </div>
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src={imageUrl}
          alt="There should be an image here :("
          className="w-full max-w-[90vw] md:max-w-[400px] h-auto rounded-lg shadow-lg object-cover"
          style={{
            aspectRatio: '1/1'
          }}
        />
      </div>
    </motion.div>
  )
}

const GoOutMessage = ({
  children
}: {
  children: React.ReactNode
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? [0, 0, 1, 1] : 0 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1]
      }}
    >
      {children}
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
      return 'Really?? That easy?'
    } else {
      return 'Bruh, did you click the wrong button?'
    }
  }

  if (clickCount === 2) {
    if (buttonType === 'yes') {
      if (lastClicked === 'yes') {
        return 'Wow, you really do love me, don\'t you?'
      } else {
        return 'Aww, so you do like me!'
      }
    } else {
      if (lastClicked === 'no') {
        return 'Come on, admit you wanna go...'
      } else {
        return 'Oh, okay, I see how it is...'
      }
    }
  }

  if (clickCount === 3) {
    return 'Wow, you really made me go through all that for nothing, did you?'
  }
  if (clickCount === 4) {
    return 'Fine, be that way...'
  }
  return ''
}

function App() {
  // Add viewport height adjustment for mobile browsers
  useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);
  const [clickCount, setClickCount] = useState(0)
  const [lastClicked, setLastClicked] = useState<'yes' | 'no' | null>(null)
  const [message, setMessage] = useState('')
  const [showMouseIcon, setShowMouseIcon] = useState(true)
  const navigate = useNavigate()

  window.onload = function () {
    setTimeout(function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowMouseIcon(false)
      }
      else {
        setShowMouseIcon(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleButtonClick = (buttonType: 'yes' | 'no') => {
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)

    if (newClickCount < 3 || newClickCount < 5 && buttonType === 'no') {
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
    <div className="bg-black text-pink-500 min-h-screen font-sans px-4 pb-4 overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-[calc(var(--vh,1vh)*100)]">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-5xl md:text-7xl font-bold text-center"
        >
          I have a question...
        </motion.h1>
        <AnimatePresence>
          {showMouseIcon && (
              <MouseIcon />
          )}
        </AnimatePresence>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl={me_nice}>
          <p className="text-3xl">I am such a nice person...<br /><br />😀😀</p>
        </AnimatedStickyNote>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl={smart}>
          <p className="text-3xl">...I am smart and can help you study...<br /><br />🤓🤓</p>
        </AnimatedStickyNote>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl={food}>
          <p className="text-3xl">...I can cook delicious meals and buy you your favorite foods...<br /><br />😋😋</p>
        </AnimatedStickyNote>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl={trumpet}>
          <p className="text-3xl">...I can play all your favorite songs on trumpet and piano...<br /><br />🎺🎹</p>
        </AnimatedStickyNote>
      </div>

      <div className="py-24 flex items-center justify-center">
        <AnimatedStickyNote imageUrl={me}>
          <p className="text-3xl">...not to mention, I am so handsome and good-looking...<br /><br />😎😎</p>
        </AnimatedStickyNote>
      </div>

      <GoOutMessage>
        <h2 className="text-4xl md:text-5xl mt-36 mb-48 text-center font-bold">...so...</h2>
      </GoOutMessage>
      <GoOutMessage>
      <div className="flex flex-col items-center justify-center h-screen font-bold">
        <h2 className="text-4xl md:text-5xl mb-12 text-center">...will you go out with me?</h2>
        {message && <p className="text-2xl md:text-3xl mb-8 text-center">{message}</p>}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 w-full max-w-xs sm:max-w-md mx-auto">
          <button
            onClick={() => handleButtonClick('yes')}
            className="bg-pink-500 hover:bg-pink-700 hover:cursor-pointer text-black px-6 sm:px-8 py-4 rounded-lg text-xl sm:text-2xl shadow-lg transition-all"
          >
            Yes!
          </button>
          <button
            onClick={() => handleButtonClick('no')}
            className="bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-black px-6 sm:px-8 py-4 rounded-lg text-xl sm:text-2xl shadow-lg transition-all"
          >
            No!
          </button>
        </div>
      </div>
      </GoOutMessage>
    </div>
  )
}

export default App

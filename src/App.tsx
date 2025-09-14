import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import StickyNote from './StickyNote'

const AnimatedStickyNote = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.8 }}
    >
      <StickyNote>{children}</StickyNote>
    </motion.div>
  )
}

function App() {
  return (
    <div className="bg-black text-pink-500 min-h-screen font-sans">
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-6xl font-bold"
        >
          I have a question for you...
        </motion.h1>
      </div>

      <div className="h-screen flex items-center justify-center">
        <AnimatedStickyNote>
          <p className="text-3xl">This is a sticky note.</p>
        </AnimatedStickyNote>
      </div>

      <div className="h-screen flex items-center justify-center">
        <AnimatedStickyNote>
          <p className="text-3xl">This is another sticky note.</p>
        </AnimatedStickyNote>
      </div>

      <div className="h-screen flex items-center justify-center">
        <AnimatedStickyNote>
          <p className="text-3xl">And one more!</p>
        </AnimatedStickyNote>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-4xl mb-8">The final question...</h2>
        <div className="flex space-x-4">
          <Link to="/yes" className="bg-pink-500 text-black px-8 py-4 rounded-lg text-2xl font-bold">
            Yes
          </Link>
          <Link to="/no" className="bg-purple-500 text-black px-8 py-4 rounded-lg text-2xl font-bold">
            No
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App

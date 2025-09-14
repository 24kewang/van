import { motion } from 'framer-motion'

interface StickyNoteProps {
  children: React.ReactNode
}

const StickyNote = ({ children }: StickyNoteProps) => {
  return (
    <motion.div
      className="bg-yellow-200 text-black p-4 sm:p-6 md:p-8 rounded-lg shadow-lg transform -rotate-3 w-full max-w-[90vw] md:max-w-[400px]"
      style={{
        minHeight: '250px',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
      }}
    >
      {children}
    </motion.div>
  )
}

export default StickyNote

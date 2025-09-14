import { motion } from 'framer-motion'

interface StickyNoteProps {
  children: React.ReactNode
}

const StickyNote = ({ children }: StickyNoteProps) => {
  return (
    <motion.div
      className="bg-yellow-200 text-black p-8 rounded-lg shadow-lg transform -rotate-3"
      style={{ minWidth: '300px', minHeight: '300px' }}
    >
      {children}
    </motion.div>
  )
}

export default StickyNote

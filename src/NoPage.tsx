import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className="bg-black text-purple-500 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center">Wow, you really hate me, don't you?</h1>
      <p className="text-xl md:text-3xl mt-8 text-center">Guess I'll just cry in a corner then 😢😢</p>
      <Link
        to="/yes"
        className="mt-8 bg-pink-500 hover:bg-pink-700 text-black px-6 py-3 rounded-lg text-xl font-bold"
      >
        I'm just kidding :3
      </Link>
    </div>
  )
}

export default NoPage

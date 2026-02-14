import React from 'react'
import ValentineCard from './components/ValentineCard'

const App = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 text-pink-600">Happy Valentine's Day!</h1>
      <p className="text-center text-gray-500 mt-4">Click the card below to reveal your secret message...</p>
      <div className="flex justify-center mt-10">
        <ValentineCard />
        {/* The ValentineCard component will go here */}
      </div>

    </div>
  )
}

export default App
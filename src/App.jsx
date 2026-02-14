import React from 'react'
import ValentineCard from './components/ValentineCard'

const App = () => {
  return (
    // min-h-screen ensures the background covers the whole phone/monitor
    // flex-col + justify-center keeps everything vertically centered
    <div className="min-h-screen w-full bg-rose-50 flex flex-col items-center justify-center p-4">
      
      {/* Header Section: Scalable text sizes for mobile (text-2xl) to desktop (text-5xl) */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 drop-shadow-sm">
          Happy Valentine's Day! 
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xs mx-auto">
          Click the card below to reveal your secret message...
        </p>
      </div>

      {/* Card Container: Responsive width */}
      <div className="w-full flex justify-center items-center">
        <ValentineCard />
      </div>

      {/* Optional: Floating hearts or footer */}
      <footer className="mt-12 text-pink-300 text-xs tracking-widest uppercase">
        Made with love
      </footer>
    </div>
  )
}

export default App
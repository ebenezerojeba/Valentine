// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, MailOpen, Sparkles, X, Check } from 'lucide-react';
// import ConfettiExplosion from 'react-confetti-explosion';

// // Customizable messages - you can expand this list!
// const romanticMessages = [
//   "My Dearest [Name],", // Placeholder for personalized name
//   "Every moment with you is a cherished gift, a melody in my heart.",
//   "You're not just my love; you're my compass, guiding me through every day.",
//   "Your smile lights up my world, brighter than any star.",
//   "With you, I've found a love deeper than any ocean, stronger than any storm.",
//   "And now, for the most important question..."
// ];

// // Fallback image if no personalized image is provided
// const defaultPartnerImage = "https://source.unsplash.com/random/400x400?couple-love"; // Replace with your own default image

// export default function ValentineCard() {
//   const [step, setStep] = useState(-1); // -1: closed, 0 to N-1: messages, N: question, N+1: accepted
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [isHoveringNo, setIsHoveringNo] = useState(false);
//   const noButtonRef = useRef(null);
  
//   // Get personalized name from URL or use a default
//   const urlParams = new URLSearchParams(window.location.search);
//   const recipientName = urlParams.get('name') || "My Love";
//   const partnerImageUrl = urlParams.get('image') || defaultPartnerImage; // For a custom photo at the end

//   // Replace placeholder in the first message
//   const personalizedMessages = romanticMessages.map((msg, index) => 
//     index === 0 ? msg.replace("[Name]", recipientName) : msg
//   );

//   const totalMessages = personalizedMessages.length;

//   const handleNext = () => {
//     if (step < totalMessages - 1) {
//       setStep(step + 1);
//     } else if (step === totalMessages - 1) {
//       // Last message is the question, so move to the question step
//       setStep(totalMessages); 
//     } else {
//       // If already on the final "Yes!" page, reset to start
//       setStep(-1);
//       setShowConfetti(false);
//     }
//   };

//   const handleYes = () => {
//     setStep(totalMessages + 1); // Move to "Accepted" state
//     setShowConfetti(true);
//     if (noButtonRef.current) {
//         noButtonRef.current.style.transform = 'translate(0, 0)'; // Reset "No" button position if it moved
//     }
//   };

//   const handleNoHover = () => {
//     setIsHoveringNo(true);
//     if (noButtonRef.current) {
//         const currentRect = noButtonRef.current.getBoundingClientRect();
//         const parentRect = noButtonRef.current.parentElement.getBoundingClientRect();

//         let newX = Math.random() * (parentRect.width - currentRect.width) - (currentRect.left - parentRect.left);
//         let newY = Math.random() * (parentRect.height - currentRect.height) - (currentRect.top - parentRect.top);

//         // Ensure button stays within a reasonable bound relative to its original position
//         // This is a bit of a hack to keep it "in sight" but moving
//         newX = Math.max(Math.min(newX, 150), -150); 
//         newY = Math.max(Math.min(newY, 100), -100);

//         noButtonRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
//         noButtonRef.current.style.transition = 'transform 0.3s ease-out';
//     }
//   };

//   useEffect(() => {
//     if (showConfetti) {
//       const timer = setTimeout(() => setShowConfetti(false), 3000); // Confetti lasts 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [showConfetti]);

//   // Background music (optional, you'd need an audio file)
//   useEffect(() => {
    // const audio = new Audio('/Edd_Sheeran_-_Perfect_(mp3.pm).mp3'); // Ensure you have this file in your /public folder
//     audio.loop = true;
//     audio.volume = 0.3; // Adjust volume as needed

//     const playAudio = () => {
//       audio.play().catch(e => console.log("Audio play prevented:", e));
//       document.removeEventListener('click', playAudio); // Play once on first interaction
//       document.removeEventListener('scroll', playAudio);
//     };

//     // Play audio on first user interaction (browser policy)
//     document.addEventListener('click', playAudio, { once: true });
//     document.addEventListener('scroll', playAudio, { once: true });

//     return () => {
//       audio.pause();
//       document.removeEventListener('click', playAudio);
//       document.removeEventListener('scroll', playAudio);
//     };
//   }, []);


//   return (
//     <div className="min-h-screen bg-linear-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
//       {/* Confetti for "Yes!" */}
//       {showConfetti && (
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
//           <ConfettiExplosion 
//             force={0.8}
//             duration={3000}
//             particleCount={150}
//             width={1600}
//             colors={['#FFC0CB', '#FF69B4', '#FF1493', '#DC143C', '#FF00FF']}
//           />
//         </div>
//       )}

//       {/* Background Floating Hearts */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ y: "100vh", opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
//             animate={{ 
//               y: "-10vh", 
//               opacity: [0, Math.random() * 0.8 + 0.2, 0], 
//               rotate: Math.random() * 360 
//             }}
//             transition={{ 
//               duration: 8 + Math.random() * 8, 
//               repeat: Infinity, 
//               delay: i * 0.5,
//               ease: "linear"
//             }}
//             className="absolute text-pink-300"
//             style={{ 
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 10}s` // Stagger animation start
//             }}
//           >
//             <Heart fill="currentColor" size={20 + Math.random() * 20} />
//           </motion.div>
//         ))}
//       </div>

//       <AnimatePresence mode="wait">
//         {step === -1 ? (
//           // STEP -1: The Sealed Envelope (Initial State)
//           <motion.div 
//             key="envelope"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }} 
//             exit={{ scale: 0.5, rotateX: 90, opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="cursor-pointer bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 border-4 border-pink-200 hover:border-pink-400 transition-all duration-300 z-10"
//             onClick={handleNext} // Click to open
//           >
//             <motion.div 
//               animate={{ y: [0, -15, 0] }} 
//               transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
//             >
//               <MailOpen size={90} className="text-pink-500" />
//             </motion.div>
//             <h2 className="text-3xl font-['Dancing_Script'] text-red-600 font-bold drop-shadow-sm">A Secret Message for You</h2>
//             <p className="text-gray-400 text-lg animate-pulse">Click to reveal your Valentine's surprise!</p>
//           </motion.div>
//         ) : step < totalMessages ? (
//           // STEP 0 to totalMessages-1: Sequential Romantic Messages
//           <motion.div
//             key={`message-${step}`}
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -50, scale: 0.9 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="z-10 text-center max-w-xl"
//           >
//             <motion.div 
//               initial={{ rotateY: -90 }}
//               animate={{ rotateY: 0 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
//               className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative overflow-hidden"
//             >
//               <Heart className="absolute -top-8 -left-8 text-red-400 fill-red-400 rotate-12 opacity-70" size={60} />
//               <Sparkles className="absolute -bottom-8 -right-8 text-yellow-300 opacity-80" size={60} />
              
//               <p className="text-2xl md:text-4xl font-['Great_Vibes'] text-gray-800 leading-relaxed mb-10 typewrite-effect">
//                 {personalizedMessages[step]}
//               </p>

//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,100,150,0.4)" }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleNext}
//                 className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
//               >
//                 {step === totalMessages - 1 ? "Ready for the question?" : "Next Sweet Thought →"}
//               </motion.button>
//             </motion.div>
            
//             <p className="mt-8 text-pink-500 font-medium text-lg">
//               {step + 1} / {totalMessages}
//             </p>
//           </motion.div>
//         ) : step === totalMessages ? (
//           // STEP N: The "Will You Be My Valentine?" Question with playful "No"
//           <motion.div
//             key="question-box"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.5 }}
//             className="z-10 text-center max-w-xl"
//           >
//             <motion.div 
//               className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative overflow-hidden"
//               initial={{ rotateX: 90 }}
//               animate={{ rotateX: 0 }}
//               transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
//             >
//               <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-red-700 leading-tight mb-10">
//                 Will you be my Valentine, <span className="text-pink-600">{recipientName}</span>?
//               </h3>
              
//               <div className="flex justify-center gap-8 relative h-20"> {/* Added height to contain button movement */}
//                 <motion.button
//                   whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(100,200,100,0.6)" }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handleYes}
//                   className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center gap-2"
//                 >
//                   <Check size={24} /> Yes!
//                 </motion.button>

//                 <motion.button
//                     ref={noButtonRef}
//                     onMouseEnter={handleNoHover}
//                     onMouseLeave={() => setIsHoveringNo(false)}
//                     initial={{ x: 0, y: 0 }}
//                     animate={isHoveringNo ? { scale: 1.05 } : { scale: 1 }} // Only scale on hover
//                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                     className="absolute bg-red-400 hover:bg-red-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 flex items-center gap-2"
//                     style={{
//                         // Initial position for "No" button
//                         position: 'relative',
//                         left: 'auto',
//                         top: 'auto',
//                         transform: 'translate(0,0)'
//                     }}
//                 >
//                   <X size={24} /> No
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         ) : (
//             // STEP N+1: "She Said Yes!" - The Final Celebration
//             <motion.div
//                 key="accepted-box"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
//                 className="z-10 text-center max-w-xl"
//             >
//                 <motion.div 
//                     className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative"
//                     initial={{ rotateZ: -10 }}
//                     animate={{ rotateZ: 0 }}
//                     transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//                 >
//                     <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-green-700 leading-tight mb-8">
//                         She said YES! 🎉
//                     </h3>
//                     <p className="text-lg md:text-xl font-serif text-gray-700 mb-8">
//                         This is just the beginning of our beautiful story, {recipientName}.
//                     </p>
//                     {partnerImageUrl && (
//                         <motion.img
//                             src={partnerImageUrl}
//                             alt="Your beautiful partner"
//                             className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto mb-8 shadow-xl border-4 border-pink-300"
//                             initial={{ scale: 0.5, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
//                         />
//                     )}
//                     <motion.button
//                         whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,150,150,0.4)" }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setStep(-1)}
//                         className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 flex items-center justify-center gap-2 mx-auto"
//                     >
//                         <Heart fill="currentColor" size={24} /> Relive the magic!
//                     </motion.button>
//                 </motion.div>
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, MailOpen, Sparkles, X, Check } from 'lucide-react';
// import ConfettiExplosion from 'react-confetti-explosion';
// import PropTypes from 'prop-types';

// // Constants
// const DEFAULT_MESSAGES = [
//   "My Dearest [Name],",
//   "Every moment with you is a cherished gift, a melody in my heart.",
//   "You're not just my love; you're my compass, guiding me through every day.",
//   "Your smile lights up my world, brighter than any star.",
//   "With you, I've found a love deeper than any ocean, stronger than any storm.",
//   "And now, for the most important question..."
// ];

// const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop";
// const DEFAULT_AUDIO_URL = ('/Edd_Sheeran_-_Perfect_(mp3.pm).mp3');

// const CONFETTI_CONFIG = {
//   force: 0.8,
//   duration: 3000,
//   particleCount: 150,
//   width: 1600,
//   colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#DC143C', '#FF00FF']
// };

// const ANIMATION_VARIANTS = {
//   envelope: {
//     initial: { scale: 0.8, opacity: 0 },
//     animate: { scale: 1, opacity: 1 },
//     exit: { scale: 0.5, rotateX: 90, opacity: 0 },
//     transition: { duration: 0.5 }
//   },
//   message: {
//     initial: { opacity: 0, y: 50, scale: 0.9 },
//     animate: { opacity: 1, y: 0, scale: 1 },
//     exit: { opacity: 0, y: -50, scale: 0.9 },
//     transition: { duration: 0.7, ease: "easeOut" }
//   },
//   question: {
//     initial: { opacity: 0, scale: 0.8 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.8 },
//     transition: { duration: 0.5 }
//   },
//   accepted: {
//     initial: { opacity: 0, scale: 0.8 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.8 },
//     transition: { duration: 0.7, type: "spring", stiffness: 100 }
//   }
// };

// // Custom Hooks
// const useUrlParams = () => {
//   return useMemo(() => {
//     try {
//       const params = new URLSearchParams(window.location.search);
//       return {
//         name: params.get('name') || "My Love",
//         image: params.get('image'),
//         theme: params.get('theme'),
//         noAudio: params.get('noAudio') === 'true'
//       };
//     } catch (error) {
//       console.error('Error parsing URL params:', error);
//       return { name: "My Love", image: null, theme: null, noAudio: false };
//     }
//   }, []);
// };

// const useAudioPlayer = (audioUrl, enabled) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!audioUrl || !enabled) return;

//     try {
//       audioRef.current = new Audio(audioUrl);
//       audioRef.current.loop = true;
//       audioRef.current.volume = 0.3;

//       const handlePlay = () => {
//         if (audioRef.current) {
//           audioRef.current.play().catch(e => {
//             console.log("Audio play prevented:", e);
//             setError('Audio playback requires user interaction');
//           });
//         }
//       };

//       const handleFirstInteraction = () => {
//         handlePlay();
//         document.removeEventListener('click', handleFirstInteraction);
//         document.removeEventListener('scroll', handleFirstInteraction);
//         document.removeEventListener('touchstart', handleFirstInteraction);
//       };

//       document.addEventListener('click', handleFirstInteraction, { once: true });
//       document.addEventListener('scroll', handleFirstInteraction, { once: true });
//       document.addEventListener('touchstart', handleFirstInteraction, { once: true });

//       return () => {
//         if (audioRef.current) {
//           audioRef.current.pause();
//           audioRef.current = null;
//         }
//         document.removeEventListener('click', handleFirstInteraction);
//         document.removeEventListener('scroll', handleFirstInteraction);
//         document.removeEventListener('touchstart', handleFirstInteraction);
//       };
//     } catch (error) {
//       setError('Failed to initialize audio');
//       console.error('Audio initialization error:', error);
//     }
//   }, [audioUrl, enabled]);

//   return { isPlaying, error };
// };

// const useConfetti = (duration = 3000) => {
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     if (!showConfetti) return;

//     const timer = setTimeout(() => setShowConfetti(false), duration);
//     return () => clearTimeout(timer);
//   }, [showConfetti, duration]);

//   const triggerConfetti = useCallback(() => setShowConfetti(true), []);
  
//   return { showConfetti, triggerConfetti };
// };

// // Sub-components
// const FloatingHearts = () => {
//   const hearts = useMemo(() => 
//     Array.from({ length: 20 }, (_, i) => ({
//       id: i,
//       left: `${Math.random() * 100}%`,
//       size: 20 + Math.random() * 20,
//       duration: 8 + Math.random() * 8,
//       delay: i * 0.5,
//       scale: Math.random() * 0.5 + 0.5,
//       opacity: Math.random() * 0.8 + 0.2
//     })), []
//   );

//   return (
//     <div className="fixed inset-0 pointer-events-none z-0">
//       {hearts.map(({ id, left, size, duration, delay, scale, opacity }) => (
//         <motion.div
//           key={id}
//           initial={{ y: "100vh", opacity: 0, scale }}
//           animate={{ 
//             y: "-10vh", 
//             opacity: [0, opacity, 0], 
//             rotate: 360 
//           }}
//           transition={{ 
//             duration, 
//             repeat: Infinity, 
//             delay,
//             ease: "linear"
//           }}
//           className="absolute text-pink-300"
//           style={{ left }}
//           aria-hidden="true"
//         >
//           <Heart fill="currentColor" size={size} />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const Envelope = ({ onClick }) => (
//   <motion.div 
//     {...ANIMATION_VARIANTS.envelope}
//     className="cursor-pointer bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 border-4 border-pink-200 hover:border-pink-400 transition-all duration-300 z-10"
//     onClick={onClick}
//     role="button"
//     tabIndex={0}
//     onKeyPress={(e) => e.key === 'Enter' && onClick()}
//     aria-label="Open Valentine's message"
//   >
//     <motion.div 
//       animate={{ y: [0, -15, 0] }} 
//       transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
//     >
//       <MailOpen size={90} className="text-pink-500" aria-hidden="true" />
//     </motion.div>
//     <h2 className="text-3xl font-['Dancing_Script'] text-red-600 font-bold drop-shadow-sm">
//       A Secret Message for You
//     </h2>
//     <p className="text-gray-400 text-lg animate-pulse">
//       Click to reveal your Valentine's surprise!
//     </p>
//   </motion.div>
// );

// Envelope.propTypes = {
//   onClick: PropTypes.func.isRequired
// };

// const MessageStep = ({ message, currentStep, totalSteps, onNext, isLastMessage }) => (
//   <motion.div
//     {...ANIMATION_VARIANTS.message}
//     className="z-10 text-center max-w-xl"
//   >
//     <motion.div 
//       initial={{ rotateY: -90 }}
//       animate={{ rotateY: 0 }}
//       transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
//       className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative overflow-hidden"
//     >
//       <Heart 
//         className="absolute -top-8 -left-8 text-red-400 fill-red-400 rotate-12 opacity-70" 
//         size={60} 
//         aria-hidden="true" 
//       />
//       <Sparkles 
//         className="absolute -bottom-8 -right-8 text-yellow-300 opacity-80" 
//         size={60} 
//         aria-hidden="true" 
//       />
      
//       <p className="text-2xl md:text-4xl font-['Great_Vibes'] text-gray-800 leading-relaxed mb-10">
//         {message}
//       </p>

//       <motion.button
//         whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,100,150,0.4)" }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onNext}
//         className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
//         aria-label={isLastMessage ? "Ready for the question" : "Next message"}
//       >
//         {isLastMessage ? "Ready for the question?" : "Next Sweet Thought →"}
//       </motion.button>
//     </motion.div>
    
//     <p className="mt-8 text-pink-500 font-medium text-lg" aria-label={`Step ${currentStep + 1} of ${totalSteps}`}>
//       {currentStep + 1} / {totalSteps}
//     </p>
//   </motion.div>
// );

// MessageStep.propTypes = {
//   message: PropTypes.string.isRequired,
//   currentStep: PropTypes.number.isRequired,
//   totalSteps: PropTypes.number.isRequired,
//   onNext: PropTypes.func.isRequired,
//   isLastMessage: PropTypes.bool.isRequired
// };

// const QuestionStep = ({ recipientName, onYes, onNoHover, noButtonRef, isHoveringNo }) => (
//   <motion.div
//     {...ANIMATION_VARIANTS.question}
//     className="z-10 text-center max-w-xl"
//   >
//     <motion.div 
//       className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative overflow-hidden"
//       initial={{ rotateX: 90 }}
//       animate={{ rotateX: 0 }}
//       transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
//     >
//       <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-red-700 leading-tight mb-10">
//         Will you be my Valentine, <span className="text-pink-600">{recipientName}</span>?
//       </h3>
      
//       <div className="flex justify-center gap-8 relative h-20">
//         <motion.button
//           whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(100,200,100,0.6)" }}
//           whileTap={{ scale: 0.9 }}
//           onClick={onYes}
//           className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center gap-2"
//           aria-label="Say yes"
//         >
//           <Check size={24} aria-hidden="true" /> Yes!
//         </motion.button>

//         <motion.button
//           ref={noButtonRef}
//           onMouseEnter={onNoHover}
//           onFocus={onNoHover}
//           initial={{ x: 0, y: 0 }}
//           animate={isHoveringNo ? { scale: 1.05 } : { scale: 1 }}
//           transition={{ type: "spring", stiffness: 300, damping: 20 }}
//           className="absolute bg-red-400 hover:bg-red-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 flex items-center gap-2"
//           style={{
//             position: 'relative',
//             left: 'auto',
//             top: 'auto',
//             transform: 'translate(0,0)'
//           }}
//           aria-label="Say no (but it's tricky!)"
//         >
//           <X size={24} aria-hidden="true" /> No
//         </motion.button>
//       </div>
//     </motion.div>
//   </motion.div>
// );

// QuestionStep.propTypes = {
//   recipientName: PropTypes.string.isRequired,
//   onYes: PropTypes.func.isRequired,
//   onNoHover: PropTypes.func.isRequired,
//   noButtonRef: PropTypes.object.isRequired,
//   isHoveringNo: PropTypes.bool.isRequired
// };

// const AcceptedStep = ({ recipientName, partnerImageUrl, onRelive }) => {
//   const [imageError, setImageError] = useState(false);

//   return (
//     <motion.div
//       {...ANIMATION_VARIANTS.accepted}
//       className="z-10 text-center max-w-xl"
//     >
//       <motion.div 
//         className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative"
//         initial={{ rotateZ: -10 }}
//         animate={{ rotateZ: 0 }}
//         transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//       >
//         <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-green-700 leading-tight mb-8">
//           She said YES! 🎉
//         </h3>
//         <p className="text-lg md:text-xl font-serif text-gray-700 mb-8">
//           This is just the beginning of our beautiful story, {recipientName}.
//         </p>
//         {partnerImageUrl && !imageError && (
//           <motion.img
//             src={partnerImageUrl}
//             alt={`Your beautiful partner ${recipientName}`}
//             className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto mb-8 shadow-xl border-4 border-pink-300"
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
//             loading="lazy"
//             onError={() => setImageError(true)}
//           />
//         )}
//         <motion.button
//           whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,150,150,0.4)" }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onRelive}
//           className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 flex items-center justify-center gap-2 mx-auto"
//           aria-label="Relive the magic"
//         >
//           <Heart fill="currentColor" size={24} aria-hidden="true" /> Relive the magic!
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// };

// AcceptedStep.propTypes = {
//   recipientName: PropTypes.string.isRequired,
//   partnerImageUrl: PropTypes.string,
//   onRelive: PropTypes.func.isRequired
// };

// // Main Component
// const ValentineCard = ({
//   defaultMessages = DEFAULT_MESSAGES,
//   defaultImage = DEFAULT_IMAGE,
//   audioUrl = DEFAULT_AUDIO_URL,
//   onComplete,
//   theme = 'light',
//   customColors
// }) => {
//   const [step, setStep] = useState(-1);
//   const [isHoveringNo, setIsHoveringNo] = useState(false);
//   const [error, setError] = useState(null);
  
//   const noButtonRef = useRef(null);
//   const { name: recipientName, image: urlImage, noAudio } = useUrlParams();
  
//   const partnerImageUrl = urlImage || defaultImage;
//   const { showConfetti, triggerConfetti } = useConfetti(3000);

//   // Disable audio if specified in URL
//   const audioEnabled = !noAudio;
//   const { error: audioError } = useAudioPlayer(audioUrl, audioEnabled);

//   // Handle audio error
//   useEffect(() => {
//     if (audioError) {
//       setError(audioError);
//     }
//   }, [audioError]);

//   const personalizedMessages = useMemo(() => 
//     defaultMessages.map((msg, index) => 
//       index === 0 ? msg.replace("[Name]", recipientName) : msg
//     ), [defaultMessages, recipientName]
//   );

//   const totalMessages = personalizedMessages.length;

//   const handleNext = useCallback(() => {
//     setStep(prev => {
//       if (prev < totalMessages - 1) {
//         return prev + 1;
//       } else if (prev === totalMessages - 1) {
//         return totalMessages;
//       } else {
//         return -1;
//       }
//     });
//   }, [totalMessages]);

//   const handleYes = useCallback(() => {
//     setStep(totalMessages + 1);
//     triggerConfetti();
//     if (onComplete) onComplete();
    
//     // Reset No button position if needed
//     if (noButtonRef.current) {
//       noButtonRef.current.style.transform = 'translate(0, 0)';
//     }
//   }, [totalMessages, triggerConfetti, onComplete]);

//   const handleNoHover = useCallback(() => {
//     if (!noButtonRef.current) return;

//     setIsHoveringNo(true);

//     try {
//       const currentRect = noButtonRef.current.getBoundingClientRect();
//       const parentElement = noButtonRef.current.parentElement;
//       if (!parentElement) return;
      
//       const parentRect = parentElement.getBoundingClientRect();

//       let newX = Math.random() * (parentRect.width - currentRect.width) - (currentRect.left - parentRect.left);
//       let newY = Math.random() * (parentRect.height - currentRect.height) - (currentRect.top - parentRect.top);

//       // Keep button within reasonable bounds
//       newX = Math.max(Math.min(newX, 150), -150);
//       newY = Math.max(Math.min(newY, 100), -100);

//       noButtonRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
//       noButtonRef.current.style.transition = 'transform 0.3s ease-out';
//     } catch (error) {
//       console.error('Error moving No button:', error);
//     }
//   }, []);

//   const handleRelive = useCallback(() => {
//     setStep(-1);
//   }, []);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'ArrowRight' && step >= 0 && step < totalMessages) {
//         handleNext();
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [step, totalMessages, handleNext]);

//   // Dynamic theme classes
//   const themeClasses = useMemo(() => {
//     if (customColors) {
//       return {
//         background: `bg-[${customColors.background}]`,
//         primary: `text-[${customColors.primary}]`,
//         secondary: `text-[${customColors.secondary}]`,
//         accent: `text-[${customColors.accent}]`
//       };
//     }
//     return {
//       background: theme === 'dark' 
//         ? 'bg-gradient-to-br from-gray-900 to-red-900' 
//         : 'bg-gradient-to-br from-pink-100 to-red-100',
//       primary: 'text-pink-500',
//       secondary: 'text-red-500',
//       accent: 'text-green-500'
//     };
//   }, [theme, customColors]);

//   // Error display
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
//           <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
//           <p className="text-gray-600">{error}</p>
//           <button
//             onClick={() => setError(null)}
//             className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${themeClasses.background} flex flex-col items-center justify-center p-4 overflow-hidden relative`}>
      
//       {/* Confetti */}
//       {showConfetti && (
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
//           <ConfettiExplosion {...CONFETTI_CONFIG} />
//         </div>
//       )}

//       <FloatingHearts />

//       <AnimatePresence mode="wait">
//         {step === -1 ? (
//           <Envelope onClick={handleNext} key="envelope" />
//         ) : step < totalMessages ? (
//           <MessageStep
//             key={`message-${step}`}
//             message={personalizedMessages[step]}
//             currentStep={step}
//             totalSteps={totalMessages}
//             onNext={handleNext}
//             isLastMessage={step === totalMessages - 1}
//           />
//         ) : step === totalMessages ? (
//           <QuestionStep
//             key="question"
//             recipientName={recipientName}
//             onYes={handleYes}
//             onNoHover={handleNoHover}
//             noButtonRef={noButtonRef}
//             isHoveringNo={isHoveringNo}
//           />
//         ) : (
//           <AcceptedStep
//             key="accepted"
//             recipientName={recipientName}
//             partnerImageUrl={partnerImageUrl}
//             onRelive={handleRelive}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// ValentineCard.propTypes = {
//   defaultMessages: PropTypes.arrayOf(PropTypes.string),
//   defaultImage: PropTypes.string,
//   audioUrl: PropTypes.string,
//   onComplete: PropTypes.func,
//   theme: PropTypes.oneOf(['light', 'dark', 'custom']),
//   customColors: PropTypes.shape({
//     primary: PropTypes.string,
//     secondary: PropTypes.string,
//     accent: PropTypes.string,
//     background: PropTypes.string
//   })
// };

// export default ValentineCard;


import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen, Sparkles, X, Check } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';
import PropTypes from 'prop-types';

// Constants
const DEFAULT_MESSAGES = [
  "My Dearest [Name],",
  "Every moment with you is a cherished gift, a melody in my heart.",
  "You're not just my love; you're my compass, guiding me through every day.",
  "Your smile lights up my world, brighter than any star.",
  "With you, I've found a love deeper than any ocean, stronger than any storm.",
  "And now, for the most important question..."
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop";
const DEFAULT_AUDIO_URL = '/Edd_Sheeran_-_Perfect_(mp3.pm).mp3';

const CONFETTI_CONFIG = {
  force: 0.8,
  duration: 3000,
  particleCount: 150,
  width: 1600,
  colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#DC143C', '#FF00FF']
};

const ANIMATION_VARIANTS = {
  envelope: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, rotateX: 90, opacity: 0 },
    transition: { duration: 0.5 }
  },
  message: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
    transition: { duration: 0.7, ease: "easeOut" }
  },
  question: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5 }
  },
  accepted: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.7, type: "spring", stiffness: 100 }
  }
};

// Custom Hooks
const useUrlParams = () => {
  return useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      
      // Parse messages from URL (msg1, msg2, msg3, etc.)
      const messages = [];
      let i = 1;
      while (params.get(`msg${i}`)) {
        messages.push(decodeURIComponent(params.get(`msg${i}`)));
        i++;
      }
      
      // Handle image parameter - support both URLs and base64
      let imageParam = params.get('image');
      
      // If it's base64 without the data URI prefix, add it
      if (imageParam && !imageParam.startsWith('http') && !imageParam.startsWith('data:')) {
        // Detect image type from base64 header or default to jpeg
        const imageType = imageParam.startsWith('/9j/') ? 'jpeg' : 
                         imageParam.startsWith('iVBORw') ? 'png' : 
                         imageParam.startsWith('R0lGOD') ? 'gif' : 'jpeg';
        imageParam = `data:image/${imageType};base64,${imageParam}`;
      }
      
      return {
        name: params.get('name') || "My Love",
        image: imageParam,
        theme: params.get('theme') || 'light',
        noAudio: params.get('noAudio') === 'true',
        audioUrl: params.get('audio'),
        messages: messages.length > 0 ? messages : null,
        bgColor: params.get('bgColor'),
        primaryColor: params.get('primaryColor'),
        secondaryColor: params.get('secondaryColor'),
        accentColor: params.get('accentColor'),
        envelopeText: params.get('envelopeText'),
        question: params.get('question'),
        yesText: params.get('yesText'),
        noText: params.get('noText'),
        successTitle: params.get('successTitle'),
        successMessage: params.get('successMessage')
      };
    } catch (error) {
      console.error('Error parsing URL params:', error);
      return { 
        name: "My Love", 
        image: null, 
        theme: 'light', 
        noAudio: false,
        messages: null
      };
    }
  }, []);
};

const useAudioPlayer = (audioUrl, enabled) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!audioUrl || !enabled) return;

    try {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      const handlePlay = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => {
            console.log("Audio play prevented:", e);
            setError('Audio playback requires user interaction');
          });
        }
      };

      const handleFirstInteraction = () => {
        handlePlay();
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('scroll', handleFirstInteraction, { once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
    } catch (error) {
      setError('Failed to initialize audio');
      console.error('Audio initialization error:', error);
    }
  }, [audioUrl, enabled]);

  return { isPlaying, error };
};

const useConfetti = (duration = 3000) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showConfetti) return;

    const timer = setTimeout(() => setShowConfetti(false), duration);
    return () => clearTimeout(timer);
  }, [showConfetti, duration]);

  const triggerConfetti = useCallback(() => setShowConfetti(true), []);
  
  return { showConfetti, triggerConfetti };
};

// Sub-components
const FloatingHearts = () => {
  const hearts = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 20 + Math.random() * 20,
      duration: 8 + Math.random() * 8,
      delay: i * 0.5,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map(({ id, left, size, duration, delay, scale, opacity }) => (
        <motion.div
          key={id}
          initial={{ y: "100vh", opacity: 0, scale }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, opacity, 0], 
            rotate: 360 
          }}
          transition={{ 
            duration, 
            repeat: Infinity, 
            delay,
            ease: "linear"
          }}
          className="absolute text-pink-300"
          style={{ left }}
          aria-hidden="true"
        >
          <Heart fill="currentColor" size={size} />
        </motion.div>
      ))}
    </div>
  );
};

const Envelope = ({ onClick, customText }) => (
  <motion.div 
    {...ANIMATION_VARIANTS.envelope}
    className="cursor-pointer bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 border-4 border-pink-200 hover:border-pink-400 transition-all duration-300 z-10"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onClick()}
    aria-label="Open Valentine's message"
  >
    <motion.div 
      animate={{ y: [0, -15, 0] }} 
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
    >
      <MailOpen size={90} className="text-pink-500" aria-hidden="true" />
    </motion.div>
    <h2 className="text-3xl font-['Dancing_Script'] text-red-600 font-bold drop-shadow-sm">
      {customText || "A Secret Message for You"}
    </h2>
    <p className="text-gray-400 text-lg animate-pulse">
      Click to reveal your Valentine's surprise!
    </p>
  </motion.div>
);

Envelope.propTypes = {
  onClick: PropTypes.func.isRequired,
  customText: PropTypes.string
};

const MessageStep = ({ message, currentStep, totalSteps, onNext, isLastMessage }) => (
  <motion.div
    {...ANIMATION_VARIANTS.message}
    className="z-10 text-center max-w-xl"
  >
    <motion.div 
      initial={{ rotateY: -90 }}
      animate={{ rotateY: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative overflow-hidden"
    >
      <Heart 
        className="absolute -top-8 -left-8 text-red-400 fill-red-400 rotate-12 opacity-70" 
        size={60} 
        aria-hidden="true" 
      />
      <Sparkles 
        className="absolute -bottom-8 -right-8 text-yellow-300 opacity-80" 
        size={60} 
        aria-hidden="true" 
      />
      
      <p className="text-2xl md:text-4xl font-['Great_Vibes'] text-gray-800 leading-relaxed mb-10">
        {message}
      </p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,100,150,0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label={isLastMessage ? "Ready for the question" : "Next message"}
      >
        {isLastMessage ? "Ready for the question?" : "Next Sweet Thought →"}
      </motion.button>
    </motion.div>
    
    <p className="mt-8 text-pink-500 font-medium text-lg" aria-label={`Step ${currentStep + 1} of ${totalSteps}`}>
      {currentStep + 1} / {totalSteps}
    </p>
  </motion.div>
);

MessageStep.propTypes = {
  message: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  isLastMessage: PropTypes.bool.isRequired
};

const QuestionStep = ({ 
  recipientName, 
  onYes, 
  onNoHover, 
  noButtonRef, 
  isHoveringNo,
  customQuestion,
  yesText,
  noText 
}) => (
  <motion.div
    {...ANIMATION_VARIANTS.question}
    className="z-10 text-center max-w-xl"
  >
    <motion.div 
      className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative overflow-hidden"
      initial={{ rotateX: 90 }}
      animate={{ rotateX: 0 }}
      transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
    >
      <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-red-700 leading-tight mb-10">
        {customQuestion || (
          <>
            Will you be my Valentine, <span className="text-pink-600">{recipientName}</span>?
          </>
        )}
      </h3>
      
      <div className="flex justify-center gap-8 relative h-20">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(100,200,100,0.6)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onYes}
          className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center gap-2"
          aria-label="Say yes"
        >
          <Check size={24} aria-hidden="true" /> {yesText || "Yes!"}
        </motion.button>

        <motion.button
          ref={noButtonRef}
          onMouseEnter={onNoHover}
          onFocus={onNoHover}
          initial={{ x: 0, y: 0 }}
          animate={isHoveringNo ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bg-red-400 hover:bg-red-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 flex items-center gap-2"
          style={{
            position: 'relative',
            left: 'auto',
            top: 'auto',
            transform: 'translate(0,0)'
          }}
          aria-label="Say no (but it's tricky!)"
        >
          <X size={24} aria-hidden="true" /> {noText || "No"}
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

QuestionStep.propTypes = {
  recipientName: PropTypes.string.isRequired,
  onYes: PropTypes.func.isRequired,
  onNoHover: PropTypes.func.isRequired,
  noButtonRef: PropTypes.object.isRequired,
  isHoveringNo: PropTypes.bool.isRequired,
  customQuestion: PropTypes.string,
  yesText: PropTypes.string,
  noText: PropTypes.string
};

const AcceptedStep = ({ 
  recipientName, 
  partnerImageUrl, 
  onRelive,
  successTitle,
  successMessage 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      {...ANIMATION_VARIANTS.accepted}
      className="z-10 text-center max-w-xl"
    >
      <motion.div 
        className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative"
        initial={{ rotateZ: -10 }}
        animate={{ rotateZ: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
      >
        <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-green-700 leading-tight mb-8">
          {successTitle || "She said YES! 🎉"}
        </h3>
        <p className="text-lg md:text-xl font-serif text-gray-700 mb-8">
          {successMessage || `This is just the beginning of our beautiful story, ${recipientName}.`}
        </p>
        {partnerImageUrl && !imageError && (
          <motion.img
            src={partnerImageUrl}
            alt={`Your beautiful partner ${recipientName}`}
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto mb-8 shadow-xl border-4 border-pink-300"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,150,150,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onRelive}
          className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 flex items-center justify-center gap-2 mx-auto"
          aria-label="Relive the magic"
        >
          <Heart fill="currentColor" size={24} aria-hidden="true" /> Relive the magic!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

AcceptedStep.propTypes = {
  recipientName: PropTypes.string.isRequired,
  partnerImageUrl: PropTypes.string,
  onRelive: PropTypes.func.isRequired,
  successTitle: PropTypes.string,
  successMessage: PropTypes.string
};

// Main Component
const ValentineCard = ({
  defaultMessages = DEFAULT_MESSAGES,
  defaultImage = DEFAULT_IMAGE,
  audioUrl = DEFAULT_AUDIO_URL,
  onComplete,
  theme = 'light',
  customColors
}) => {
  const [step, setStep] = useState(-1);
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [error, setError] = useState(null);
  
  const noButtonRef = useRef(null);
  const urlParams = useUrlParams();
  
  // Use URL params with fallbacks
  const recipientName = urlParams.name;
  const partnerImageUrl = urlParams.image || defaultImage;
  const finalAudioUrl = urlParams.audioUrl || audioUrl;
  const finalTheme = urlParams.theme || theme;
  const audioEnabled = !urlParams.noAudio;
  
  const { showConfetti, triggerConfetti } = useConfetti(3000);
  const { error: audioError } = useAudioPlayer(finalAudioUrl, audioEnabled);

  // Handle audio error
  useEffect(() => {
    if (audioError) {
      setError(audioError);
    }
  }, [audioError]);

  // Use custom messages from URL or default
  const personalizedMessages = useMemo(() => {
    const msgs = urlParams.messages || defaultMessages;
    return msgs.map((msg, index) => 
      index === 0 ? msg.replace("[Name]", recipientName) : msg
    );
  }, [urlParams.messages, defaultMessages, recipientName]);

  const totalMessages = personalizedMessages.length;

  const handleNext = useCallback(() => {
    setStep(prev => {
      if (prev < totalMessages - 1) {
        return prev + 1;
      } else if (prev === totalMessages - 1) {
        return totalMessages;
      } else {
        return -1;
      }
    });
  }, [totalMessages]);

  const handleYes = useCallback(() => {
    setStep(totalMessages + 1);
    triggerConfetti();
    if (onComplete) onComplete();
    
    // Reset No button position if needed
    if (noButtonRef.current) {
      noButtonRef.current.style.transform = 'translate(0, 0)';
    }
  }, [totalMessages, triggerConfetti, onComplete]);

  const handleNoHover = useCallback(() => {
    if (!noButtonRef.current) return;

    setIsHoveringNo(true);

    try {
      const currentRect = noButtonRef.current.getBoundingClientRect();
      const parentElement = noButtonRef.current.parentElement;
      if (!parentElement) return;
      
      const parentRect = parentElement.getBoundingClientRect();

      let newX = Math.random() * (parentRect.width - currentRect.width) - (currentRect.left - parentRect.left);
      let newY = Math.random() * (parentRect.height - currentRect.height) - (currentRect.top - parentRect.top);

      // Keep button within reasonable bounds
      newX = Math.max(Math.min(newX, 150), -150);
      newY = Math.max(Math.min(newY, 100), -100);

      noButtonRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      noButtonRef.current.style.transition = 'transform 0.3s ease-out';
    } catch (error) {
      console.error('Error moving No button:', error);
    }
  }, []);

  const handleRelive = useCallback(() => {
    setStep(-1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && step >= 0 && step < totalMessages) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, totalMessages, handleNext]);

  // Dynamic theme classes with URL color support
  const themeClasses = useMemo(() => {
    // Priority: URL params > customColors prop > theme
    if (urlParams.bgColor || urlParams.primaryColor || customColors) {
      const bg = urlParams.bgColor || customColors?.background;
      return {
        background: bg ? `bg-[${bg}]` : (finalTheme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-red-900' 
          : 'bg-gradient-to-br from-pink-100 to-red-100'),
        primary: urlParams.primaryColor ? `text-[${urlParams.primaryColor}]` : 'text-pink-500',
        secondary: urlParams.secondaryColor ? `text-[${urlParams.secondaryColor}]` : 'text-red-500',
        accent: urlParams.accentColor ? `text-[${urlParams.accentColor}]` : 'text-green-500'
      };
    }
    return {
      background: finalTheme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-red-900' 
        : 'bg-gradient-to-br from-pink-100 to-red-100',
      primary: 'text-pink-500',
      secondary: 'text-red-500',
      accent: 'text-green-500'
    };
  }, [finalTheme, customColors, urlParams]);

  // Custom background style for URL colors
  const backgroundStyle = useMemo(() => {
    if (urlParams.bgColor) {
      return {
        background: urlParams.bgColor.includes('gradient') 
          ? urlParams.bgColor 
          : `linear-gradient(to bottom right, ${urlParams.bgColor}, ${urlParams.secondaryColor || urlParams.bgColor})`
      };
    }
    return {};
  }, [urlParams.bgColor, urlParams.secondaryColor]);

  // Error display
  if (error && error !== 'Audio playback requires user interaction') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen ${themeClasses.background} flex flex-col items-center justify-center p-4 overflow-hidden relative`}
      style={backgroundStyle}
    >
      
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <ConfettiExplosion {...CONFETTI_CONFIG} />
        </div>
      )}

      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === -1 ? (
          <Envelope 
            onClick={handleNext} 
            key="envelope"
            customText={urlParams.envelopeText}
          />
        ) : step < totalMessages ? (
          <MessageStep
            key={`message-${step}`}
            message={personalizedMessages[step]}
            currentStep={step}
            totalSteps={totalMessages}
            onNext={handleNext}
            isLastMessage={step === totalMessages - 1}
          />
        ) : step === totalMessages ? (
          <QuestionStep
            key="question"
            recipientName={recipientName}
            onYes={handleYes}
            onNoHover={handleNoHover}
            noButtonRef={noButtonRef}
            isHoveringNo={isHoveringNo}
            customQuestion={urlParams.question}
            yesText={urlParams.yesText}
            noText={urlParams.noText}
          />
        ) : (
          <AcceptedStep
            key="accepted"
            recipientName={recipientName}
            partnerImageUrl={partnerImageUrl}
            onRelive={handleRelive}
            successTitle={urlParams.successTitle}
            successMessage={urlParams.successMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

ValentineCard.propTypes = {
  defaultMessages: PropTypes.arrayOf(PropTypes.string),
  defaultImage: PropTypes.string,
  audioUrl: PropTypes.string,
  onComplete: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark', 'custom']),
  customColors: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    accent: PropTypes.string,
    background: PropTypes.string
  })
};

export default ValentineCard;
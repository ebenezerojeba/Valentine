// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, MailOpen, Sparkles, X, Check, Crown, Coffee, Book, Music } from 'lucide-react';
// import ConfettiExplosion from 'react-confetti-explosion';
// import PropTypes from 'prop-types';

// // Empowerment-focused messages
// const DEFAULT_MESSAGES = [
//   "Hey Queen 👑",
//   "Feeling down? Let me remind you of something important...",
//   "You don't need anyone to complete you - you're already whole.",
//   "Your worth isn't determined by relationship status.",
//   "You're thriving on your own terms, living your best life.",
//   "So here's the real question..."
// ];

// const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop";
// const DEFAULT_AUDIO_URL = '/beyonce-run-the-world.mp3'; // Empowerment anthem
// const CONFETTI_CONFIG = { 
//   force: 0.8, 
//   duration: 3000, 
//   particleCount: 200, 
//   width: 1600, 
//   colors: ['#FFD700', '#FF69B4', '#9370DB', '#00CED1', '#FF1493'] // Gold, pink, purple, turquoise
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

// const useUrlParams = () => {
//   return useMemo(() => {
//     try {
//       const params = new URLSearchParams(window.location.search);
//       const messages = [];
//       let i = 1;
//       while (params.get(`msg${i}`)) { 
//         messages.push(decodeURIComponent(params.get(`msg${i}`))); 
//         i++; 
//       }
      
//       let imageParam = params.get('image');
//       if (imageParam && !imageParam.startsWith('http') && !imageParam.startsWith('data:')) {
//         const imageType = imageParam.startsWith('/9j/') ? 'jpeg' : 
//                          imageParam.startsWith('iVBORw') ? 'png' : 
//                          imageParam.startsWith('R0lGOD') ? 'gif' : 'jpeg';
//         imageParam = `data:image/${imageType};base64,${imageParam}`;
//       }
      
//       return {
//         name: params.get('name') || "Queen",
//         image: imageParam,
//         theme: params.get('theme') || 'empowerment',
//         noAudio: params.get('noAudio') === 'true',
//         audioUrl: params.get('audio'),
//         messages: messages.length > 0 ? messages : null,
//         envelopeText: params.get('envelopeText'),
//         question: params.get('question'),
//         yesText: params.get('yesText'),
//         noText: params.get('noText'),
//         successTitle: params.get('successTitle'),
//         successMessage: params.get('successMessage')
//       };
//     } catch (error) { 
//       return { 
//         name: "Queen", 
//         image: null, 
//         theme: 'empowerment', 
//         noAudio: false, 
//         messages: null 
//       }; 
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
      
//       const handleFirstInteraction = () => { 
//         if (audioRef.current) {
//           audioRef.current.play().catch(() => setError('Audio playback requires interaction')); 
//         }
//         ['click', 'scroll', 'touchstart'].forEach(e => 
//           document.removeEventListener(e, handleFirstInteraction)
//         ); 
//       };
      
//       ['click', 'scroll', 'touchstart'].forEach(e => 
//         document.addEventListener(e, handleFirstInteraction, { once: true })
//       );
      
//       return () => { 
//         if (audioRef.current) audioRef.current.pause(); 
//         ['click', 'scroll', 'touchstart'].forEach(e => 
//           document.removeEventListener(e, handleFirstInteraction)
//         ); 
//       };
//     } catch (error) { 
//       setError('Failed to initialize audio'); 
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

// // Floating empowerment icons instead of hearts
// const FloatingIcons = () => {
//   const icons = useMemo(() => {
//     const iconSet = [Crown, Coffee, Book, Music, Sparkles];
//     return Array.from({ length: 15 }, (_, i) => ({ 
//       id: i, 
//       Icon: iconSet[i % iconSet.length],
//       left: `${Math.random() * 100}%`, 
//       size: 20 + Math.random() * 15, 
//       duration: 10 + Math.random() * 8, 
//       delay: i * 0.6, 
//       scale: Math.random() * 0.5 + 0.5, 
//       opacity: Math.random() * 0.6 + 0.3 
//     }));
//   }, []);
  
//   return (
//     <div className="fixed inset-0 pointer-events-none z-0">
//       {icons.map(({ id, Icon, left, size, duration, delay, scale, opacity }) => (
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
//           className="absolute text-purple-400" 
//           style={{ left }}
//         >
//           <Icon size={size} />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const Envelope = ({ onClick, customText }) => (
//   <motion.div 
//     {...ANIMATION_VARIANTS.envelope} 
//     className="cursor-pointer bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 border-4 border-purple-300 hover:border-gold-400 z-10" 
//     onClick={onClick}
//   >
//     <motion.div 
//       animate={{ y: [0, -15, 0] }} 
//       transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
//     >
//       <Crown size={90} className="text-purple-600" />
//     </motion.div>
//     <h2 className="text-3xl font-['Dancing_Script'] text-purple-700 font-bold text-center">
//       {customText || "A Message Just For You 👑"}
//     </h2>
//     <p className="text-gray-400 text-lg animate-pulse">Click to open!</p>
//   </motion.div>
// );

// const MessageStep = ({ message, currentStep, totalSteps, onNext, isLastMessage }) => (
//   <motion.div {...ANIMATION_VARIANTS.message} className="z-10 text-center max-w-xl">
//     <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl relative overflow-hidden">
//       <p className="text-2xl md:text-4xl font-['Great_Vibes'] text-gray-800 mb-10">
//         {message}
//       </p>
//       <button 
//         onClick={onNext} 
//         className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold cursor-pointer hover:bg-purple-700 transition-colors"
//       >
//         {isLastMessage ? "Tell me! →" : "Continue →"}
//       </button>
//     </div>
//   </motion.div>
// );

// // The key change: "Men" button that runs away
// const QuestionStep = ({ 
//   recipientName, 
//   onYes, 
//   menButtonRef, 
//   menCount, 
//   handleMenRunAway, 
//   buttonText, 
//   customQuestion, 
//   yesText 
// }) => (
//   <motion.div {...ANIMATION_VARIANTS.question} className="z-10 text-center max-w-2xl">
//     <motion.div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-white relative">
//       <div className="mb-6">
//         <Crown className="inline text-gold-500 mb-2" size={48} />
//       </div>
      
//       <h3 className="text-3xl md:text-4xl font-['Great_Vibes'] text-purple-700 mb-6 leading-tight">
//         {customQuestion || (
//           <>
//             Are you ready to embrace<br />
//             <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 font-bold">
//               Self-Love & Independence
//             </span>
//             <br />this season, {recipientName}?
//           </>
//         )}
//       </h3>
      
//       <p className="text-gray-600 mb-8 text-lg">
//         Remember: No Men, No Problem! 💅
//       </p>
      
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-8 h-48 relative">
//         <motion.button
//           animate={{ scale: 1 + (menCount * 0.08) }}
//           onClick={onYes}
//           className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full font-bold text-xl shadow-lg z-10 hover:shadow-xl transition-shadow"
//         >
//           <Check size={24} className="inline mr-2" /> 
//           {yesText || "Hell Yes! 👑"}
//         </motion.button>

//         <motion.button
//           ref={menButtonRef}
//           onPointerDown={handleMenRunAway}
//           className="bg-gray-400 text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg whitespace-nowrap opacity-80"
//           style={{ 
//             transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//             touchAction: 'none' 
//           }}
//         >
//           <X size={20} className="inline mr-2" /> {buttonText}
//         </motion.button>
//       </div>
      
//       {menCount > 3 && (
//         <motion.p 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-pink-600 text-sm mt-4 font-medium"
//         >
//           See? They always run! 😂
//         </motion.p>
//       )}
//     </motion.div>
//   </motion.div>
// );

// const AcceptedStep = ({ recipientName, partnerImageUrl, onRelive, successTitle, successMessage }) => (
//   <motion.div {...ANIMATION_VARIANTS.accepted} className="z-10 text-center max-w-xl">
//     <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-xl">
//       <Crown className="inline text-gold-500 mb-4" size={64} />
      
//       <h3 className="text-4xl text-purple-700 mb-4 font-bold">
//         {successTitle || "THAT'S MY QUEEN! 👑✨"}
//       </h3>
      
//       <p className="text-xl text-gray-700 mb-8 leading-relaxed">
//         {successMessage || `You're choosing yourself, ${recipientName}. That's the most powerful love of all. Keep shining, keep thriving, and remember - you don't need anyone to complete you. You're already complete. 💜`}
//       </p>
      
//       {partnerImageUrl && (
//         <img 
//           src={partnerImageUrl} 
//           alt="You" 
//           className="w-48 h-48 rounded-full mx-auto mb-8 shadow-xl border-4 border-purple-400" 
//         />
//       )}
      
//       <div className="bg-purple-50 p-6 rounded-2xl mb-8">
//         <h4 className="font-bold text-purple-700 mb-3 text-lg">Your Self-Love Affirmations:</h4>
//         <ul className="text-left text-gray-700 space-y-2">
//           <li>✨ I am enough, just as I am</li>
//           <li>💪 My happiness comes from within</li>
//           <li>🌟 I choose peace over drama</li>
//           <li>👑 I am the main character of my story</li>
//           <li>💜 I deserve all good things</li>
//         </ul>
//       </div>
      
//       <button 
//         onClick={onRelive} 
//         className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-shadow"
//       >
//         Experience this again! ✨
//       </button>
//     </div>
//   </motion.div>
// );

// // Main Component
// const SelfLoveCard = ({ 
//   defaultMessages = DEFAULT_MESSAGES, 
//   defaultImage = DEFAULT_IMAGE, 
//   audioUrl = DEFAULT_AUDIO_URL, 
//   onComplete, 
//   theme = 'empowerment' 
// }) => {
//   const [step, setStep] = useState(-1);
//   const [menCount, setMenCount] = useState(0);
  
//   const menButtonRef = useRef(null);
//   const urlParams = useUrlParams();
//   const { showConfetti, triggerConfetti } = useConfetti(3000);
//   useAudioPlayer(urlParams.audioUrl || audioUrl, !urlParams.noAudio);

//   const getMenButtonText = useMemo(() => {
//     const phrases = [
//       urlParams.noText || "Men 🚶‍♂️",
//       "Wait, come back!",
//       "But I'm different!",
//       "Give me a chance!",
//       "I'll change!",
//       "You need me!",
//       "Don't you want love?",
//       "You'll be lonely!",
//       "I'm a nice guy!",
//       "See? They always run! 😂"
//     ];
//     return phrases[Math.min(menCount, phrases.length - 1)];
//   }, [menCount, urlParams.noText]);

//   const handleMenRunAway = useCallback((e) => {
//     e.preventDefault();
//     setMenCount(prev => prev + 1);
    
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;
//     const randomX = Math.random() * (vw - 250) + 125;
//     const randomY = Math.random() * (vh - 250) + 125;

//     if (menButtonRef.current) {
//       menButtonRef.current.style.position = 'fixed';
//       menButtonRef.current.style.left = `${randomX}px`;
//       menButtonRef.current.style.top = `${randomY}px`;
//       menButtonRef.current.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 40}deg) scale(${1 - menCount * 0.05})`;
      
//       // Make it increasingly transparent as it runs away
//       menButtonRef.current.style.opacity = Math.max(0.3, 1 - menCount * 0.08);
//     }
//   }, [menCount]);

//   const recipientName = urlParams.name;
//   const personalizedMessages = useMemo(() => 
//     (urlParams.messages || defaultMessages).map((msg, i) => 
//       i === 0 ? msg.replace("[Name]", recipientName).replace("Queen", recipientName) : msg
//     ), 
//     [urlParams.messages, defaultMessages, recipientName]
//   );

//   const handleNext = () => setStep(prev => (prev < personalizedMessages.length ? prev + 1 : -1));
  
//   const handleYes = () => { 
//     setStep(personalizedMessages.length + 1); 
//     triggerConfetti(); 
//     if (onComplete) onComplete(); 
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4 overflow-hidden relative">
//       {showConfetti && (
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
//           <ConfettiExplosion {...CONFETTI_CONFIG} />
//         </div>
//       )}
      
//       <FloatingIcons />
      
//       <AnimatePresence mode="wait">
//         {step === -1 ? (
//           <Envelope 
//             onClick={handleNext} 
//             key="envelope" 
//             customText={urlParams.envelopeText} 
//           />
//         ) : step < personalizedMessages.length ? (
//           <MessageStep 
//             key={step} 
//             message={personalizedMessages[step]} 
//             currentStep={step} 
//             totalSteps={personalizedMessages.length} 
//             onNext={handleNext} 
//             isLastMessage={step === personalizedMessages.length - 1} 
//           />
//         ) : step === personalizedMessages.length ? (
//           <QuestionStep
//             key="question"
//             recipientName={recipientName}
//             onYes={handleYes}
//             menButtonRef={menButtonRef}
//             menCount={menCount}
//             handleMenRunAway={handleMenRunAway}
//             buttonText={getMenButtonText}
//             customQuestion={urlParams.question}
//             yesText={urlParams.yesText}
//           />
//         ) : (
//           <AcceptedStep 
//             key="accepted" 
//             recipientName={recipientName} 
//             partnerImageUrl={urlParams.image || defaultImage} 
//             onRelive={() => setStep(-1)} 
//             successTitle={urlParams.successTitle}
//             successMessage={urlParams.successMessage}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// SelfLoveCard.propTypes = {
//   defaultMessages: PropTypes.arrayOf(PropTypes.string),
//   defaultImage: PropTypes.string,
//   audioUrl: PropTypes.string,
//   onComplete: PropTypes.func,
//   theme: PropTypes.string
// };

// export default SelfLoveCard;







import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail, Sparkles, X, Check, Cake } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';
import PropTypes from 'prop-types';

// Default birthday messages
const DEFAULT_MESSAGES = [
  "Happy Birthday [Name]! 🎂",
  "Another year older, another year wiser, and another year more amazing!",
  "Today we celebrate YOU - the incredible person you are.",
  "May this year bring you joy, laughter, and unforgettable memories.",
  "Here's to new adventures, exciting opportunities, and endless happiness!",
  "And now, the most important question..."
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop";
const DEFAULT_AUDIO_URL = '/andriig-happy-birthday-471211.mp3';

const CONFETTI_CONFIG = { 
  force: 0.8, 
  duration: 3000, 
  particleCount: 200, 
  width: 1600, 
  colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'] 
};

const ANIMATION_VARIANTS = {
  envelope: { 
    initial: { scale: 0.8, opacity: 0, rotateY: -15 }, 
    animate: { scale: 1, opacity: 1, rotateY: 0 }, 
    exit: { scale: 0.5, rotateX: 90, opacity: 0 }, 
    transition: { duration: 0.6, type: "spring" } 
  },
  message: { 
    initial: { opacity: 0, y: 50, scale: 0.9 }, 
    animate: { opacity: 1, y: 0, scale: 1 }, 
    exit: { opacity: 0, y: -50, scale: 0.9 }, 
    transition: { duration: 0.7, ease: "easeOut" } 
  },
  question: { 
    initial: { opacity: 0, scale: 0.8, rotate: -5 }, 
    animate: { opacity: 1, scale: 1, rotate: 0 }, 
    exit: { opacity: 0, scale: 0.8 }, 
    transition: { duration: 0.5, type: "spring", stiffness: 120 } 
  },
  accepted: { 
    initial: { opacity: 0, scale: 0.8 }, 
    animate: { opacity: 1, scale: 1 }, 
    exit: { opacity: 0, scale: 0.8 }, 
    transition: { duration: 0.7, type: "spring", stiffness: 100 } 
  }
};

// URL Params Hook
const useUrlParams = () => {
  return useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const messages = [];
      let i = 1;
      while (params.get(`msg${i}`)) { 
        messages.push(decodeURIComponent(params.get(`msg${i}`))); 
        i++; 
      }
      
      let imageParam = params.get('image');
      if (imageParam && !imageParam.startsWith('http') && !imageParam.startsWith('data:')) {
        const imageType = imageParam.startsWith('/9j/') ? 'jpeg' : 
                         imageParam.startsWith('iVBORw') ? 'png' : 
                         imageParam.startsWith('R0lGOD') ? 'gif' : 'jpeg';
        imageParam = `data:image/${imageType};base64,${imageParam}`;
      }
      
      return {
        name: params.get('name') || "Friend",
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
      return { 
        name: "Friend", 
        image: null, 
        theme: 'light', 
        noAudio: false, 
        messages: null 
      }; 
    }
  }, []);
};

// Audio Player Hook
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
        if (audioRef.current) 
          audioRef.current.play().catch(() => setError('Audio playback requires interaction')); 
      };
      
      const handleFirstInteraction = () => { 
        handlePlay(); 
        ['click', 'scroll', 'touchstart'].forEach(e => 
          document.removeEventListener(e, handleFirstInteraction)
        ); 
      };
      
      ['click', 'scroll', 'touchstart'].forEach(e => 
        document.addEventListener(e, handleFirstInteraction, { once: true })
      );
      
      return () => { 
        if (audioRef.current) audioRef.current.pause(); 
        ['click', 'scroll', 'touchstart'].forEach(e => 
          document.removeEventListener(e, handleFirstInteraction)
        ); 
      };
    } catch (error) { 
      setError('Failed to initialize audio'); 
    }
  }, [audioUrl, enabled]);
  
  return { isPlaying, error };
};

// Confetti Hook
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

// Floating Balloons Component
const FloatingBalloons = () => {
  const balloons = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 40 + Math.random() * 40,
      duration: 10 + Math.random() * 10,
      delay: i * 0.7,
      scale: Math.random() * 0.4 + 0.6,
      opacity: Math.random() * 0.6 + 0.4,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#FFD700', '#98D8C8'][Math.floor(Math.random() * 6)]
    })), 
  []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {balloons.map(({ id, left, size, duration, delay, scale, opacity, color }) => (
        <motion.div
          key={id}
          initial={{ y: "110vh", opacity: 0, scale }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, opacity, opacity, 0],
            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
            rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0]
          }}
          transition={{ 
            duration, 
            repeat: Infinity, 
            delay, 
            ease: "linear" 
          }}
          className="absolute"
          style={{ left }}
        >
          <div 
            className="rounded-full shadow-lg"
            style={{ 
              width: size, 
              height: size * 1.2, 
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              position: 'relative'
            }}
          >
            {/* Balloon string */}
            <div 
              className="absolute left-1/2 top-full w-0.5 bg-gray-400" 
              style={{ height: size * 0.8, transform: 'translateX(-50%)' }}
            />
            {/* Balloon shine */}
            <div 
              className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60"
              style={{ width: size * 0.15, height: size * 0.15 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Envelope Component
const Envelope = ({ onClick, customText }) => (
  <motion.div
    {...ANIMATION_VARIANTS.envelope}
    className="cursor-pointer bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 border-4 border-yellow-300 hover:border-yellow-500 z-10 hover:shadow-yellow-200 transition-shadow"
    onClick={onClick}
  >
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <Gift size={90} className="text-yellow-500" />
    </motion.div>
    <h2 className="text-3xl font-['Dancing_Script'] text-orange-600 font-bold text-center">
      {customText || "🎉 A Special Birthday Surprise! 🎉"}
    </h2>
    <p className="text-gray-500 text-lg animate-pulse flex items-center gap-2">
      <Sparkles size={20} className="text-yellow-500" />
      Click to unwrap!
      <Sparkles size={20} className="text-yellow-500" />
    </p>
  </motion.div>
);

// Message Step Component
const MessageStep = ({ message, currentStep, totalSteps, onNext, isLastMessage }) => (
  <motion.div
    {...ANIMATION_VARIANTS.message}
    className="z-10 text-center max-w-2xl"
  >
    <div className="bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-xl relative overflow-hidden border-2 border-yellow-200">
      {/* Decorative sparkles */}
      <div className="absolute top-4 right-4">
        <Sparkles className="text-yellow-400" size={30} />
      </div>
      <div className="absolute bottom-4 left-4">
        <Cake className="text-orange-400" size={30} />
      </div>
      
      <p className="text-2xl md:text-4xl font-['Great_Vibes'] text-gray-800 mb-10 leading-relaxed">
        {message}
      </p>
      
      <button
        onClick={onNext}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-4 rounded-full font-bold cursor-pointer hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg"
      >
        {isLastMessage ? "Ready? 🎁" : "Next →"}
      </button>
    </div>
  </motion.div>
);

// Question Step Component
const QuestionStep = ({ 
  recipientName, 
  onYes, 
  noButtonRef, 
  noCount, 
  handleNoMove, 
  buttonText, 
  customQuestion, 
  yesText 
}) => (
  <motion.div
    {...ANIMATION_VARIANTS.question}
    className="z-10 text-center max-w-xl"
  >
    <motion.div className="bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-xl border-2 border-yellow-300 relative">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Cake className="text-orange-500" size={48} />
      </div>
      
      <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-orange-700 mb-10 mt-4">
        {customQuestion || (
          <>
            Will you accept my birthday wishes, <span className="text-yellow-600">{recipientName}</span>? 🎂
          </>
        )}
      </h3>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 h-40 relative">
        <motion.button
          animate={{ scale: 1 + (noCount * 0.1) }}
          onClick={onYes}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg z-10 hover:from-green-600 hover:to-green-700 transition-all"
        >
          <Check size={24} className="inline mr-2" /> {yesText || "Of course!"}
        </motion.button>

        <motion.button
          ref={noButtonRef}
          onPointerDown={handleNoMove}
          className="bg-gradient-to-r from-red-400 to-red-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg whitespace-nowrap hover:from-red-500 hover:to-red-600"
          style={{ 
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            touchAction: 'none' 
          }}
        >
          <X size={20} className="inline mr-2" /> {buttonText}
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

// Accepted Step Component
const AcceptedStep = ({ recipientName, partnerImageUrl, onRelive, successTitle, successMessage }) => (
  <motion.div
    {...ANIMATION_VARIANTS.accepted}
    className="z-10 text-center max-w-xl"
  >
    <div className="bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-xl border-2 border-yellow-300">
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0] }}
        transition={{ duration: 0.5, repeat: 3 }}
      >
        <h3 className="text-4xl text-green-700 mb-8 font-bold">
          {successTitle || "🎉 Yay! Happy Birthday! 🎉"}
        </h3>
      </motion.div>
      
      <p className="text-xl text-gray-700 mb-8">
        {successMessage || `Wishing you the most amazing year ahead, ${recipientName}! 🎂✨`}
      </p>
      
      {partnerImageUrl && (
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          src={partnerImageUrl}
          alt="Birthday Person"
          className="w-48 h-48 rounded-full mx-auto mb-8 shadow-xl border-4 border-yellow-400 object-cover"
        />
      )}
      
      <button
        onClick={onRelive}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
      >
        🎈 Celebrate Again! 🎈
      </button>
    </div>
  </motion.div>
);

// Main Component
const BirthdayCard = ({ 
  defaultMessages = DEFAULT_MESSAGES, 
  defaultImage = DEFAULT_IMAGE, 
  audioUrl = DEFAULT_AUDIO_URL, 
  onComplete, 
  theme = 'light' 
}) => {
  const [step, setStep] = useState(-1);
  const [noCount, setNoCount] = useState(0);
  const [error, setError] = useState(null);
  
  const noButtonRef = useRef(null);
  const urlParams = useUrlParams();
  const { showConfetti, triggerConfetti } = useConfetti(3000);
  useAudioPlayer(urlParams.audioUrl || audioUrl, !urlParams.noAudio);

  const getNoButtonText = useMemo(() => {
    const phrases = [
      urlParams.noText || "No thanks", 
      "Wait, what? 🤔", 
      "Wrong button! ↗️", 
      "Come on! 😜", 
      "Really? 😅", 
      "Are you sure?", 
      "The green one! 👆", 
      "Nice try! 🎯", 
      "Just say yes! 🎂", 
      "Please? 🥺"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  }, [noCount, urlParams.noText]);

  const handleNoMove = useCallback((e) => {
    e.preventDefault();
    setNoCount(prev => prev + 1);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const randomX = Math.random() * (vw - 200) + 100;
    const randomY = Math.random() * (vh - 200) + 100;

    if (noButtonRef.current) {
      noButtonRef.current.style.position = 'fixed';
      noButtonRef.current.style.left = `${randomX}px`;
      noButtonRef.current.style.top = `${randomY}px`;
      noButtonRef.current.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 30}deg)`;
    }
  }, []);

  const recipientName = urlParams.name;
  const personalizedMessages = useMemo(() => 
    (urlParams.messages || defaultMessages).map((msg, i) => 
      i === 0 ? msg.replace("[Name]", recipientName) : msg
    ), 
    [urlParams.messages, defaultMessages, recipientName]
  );

  const handleNext = () => setStep(prev => (prev < personalizedMessages.length ? prev + 1 : -1));
  const handleYes = () => { 
    setStep(personalizedMessages.length + 1); 
    triggerConfetti(); 
    if (onComplete) onComplete(); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <ConfettiExplosion {...CONFETTI_CONFIG} />
        </div>
      )}
      
      {/* Floating Balloons */}
      <FloatingBalloons />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {step === -1 ? (
          <Envelope onClick={handleNext} key="envelope" customText={urlParams.envelopeText} />
        ) : step < personalizedMessages.length ? (
          <MessageStep
            key={step}
            message={personalizedMessages[step]}
            currentStep={step}
            totalSteps={personalizedMessages.length}
            onNext={handleNext}
            isLastMessage={step === personalizedMessages.length - 1}
          />
        ) : step === personalizedMessages.length ? (
          <QuestionStep
            key="question"
            recipientName={recipientName}
            onYes={handleYes}
            noButtonRef={noButtonRef}
            noCount={noCount}
            handleNoMove={handleNoMove}
            buttonText={getNoButtonText}
            customQuestion={urlParams.question}
            yesText={urlParams.yesText}
          />
        ) : (
          <AcceptedStep
            key="accepted"
            recipientName={recipientName}
            partnerImageUrl={urlParams.image || defaultImage}
            onRelive={() => setStep(-1)}
            successTitle={urlParams.successTitle}
            successMessage={urlParams.successMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

BirthdayCard.propTypes = {
  defaultMessages: PropTypes.arrayOf(PropTypes.string),
  defaultImage: PropTypes.string,
  audioUrl: PropTypes.string,
  onComplete: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark'])
};

export default BirthdayCard;
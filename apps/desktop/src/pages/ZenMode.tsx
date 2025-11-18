import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLifeStore } from '@lifeos/core';
import { X, Volume2 } from 'lucide-react';
import AudioMixer from '../components/AudioMixer';

export default function ZenMode(): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { addXP } = useLifeStore();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setShowConfetti(true);
      addXP(100);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeLeft(1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, addXP]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-12"
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-2 text-white/10">Zen Mode</h1>
          <p className="text-white/30">Focus. Breathe. Grow.</p>
        </div>

        <motion.div
          className="relative"
          animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            duration: 3,
            repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
          }}
        >
          <div className="text-center">
            <div className="text-9xl font-bold text-primary font-mono mb-8 tracking-wider">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>

          {showConfetti && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <div className="text-6xl">🎉</div>
            </motion.div>
          )}
        </motion.div>

        <div className="flex gap-6">
          <button
            onClick={toggleTimer}
            className={`px-12 py-4 rounded-full text-lg font-bold transition-all ${
              isRunning
                ? 'bg-red-500/30 text-red-300 hover:bg-red-500/50'
                : 'bg-primary/30 text-primary hover:bg-primary/50'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => {
              setTimeLeft(1500);
              setIsRunning(false);
            }}
            className="px-12 py-4 rounded-full text-lg font-bold bg-white/5 text-white/50 hover:bg-white/10 transition-all"
          >
            Reset
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-12 flex items-center gap-2 text-white/50">
        <Volume2 size={20} />
        <span>Audio Mixer</span>
      </div>
      <AudioMixer />
    </div>
  );
}

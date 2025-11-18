import { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioSource {
  name: string;
  emoji: string;
  frequency: number;
}

const AUDIO_SOURCES: AudioSource[] = [
  { name: 'Rain', emoji: '🌧️', frequency: 20 },
  { name: 'Fire', emoji: '🔥', frequency: 80 },
  { name: 'Cafe', emoji: '☕', frequency: 55 },
];

export default function AudioMixer(): JSX.Element {
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({
    Rain: 0.5,
    Fire: 0.3,
    Cafe: 0.2,
  });
  const oscillatorsRef = useRef<{ [key: string]: OscillatorNode }>({});
  const gainsRef = useRef<{ [key: string]: GainNode }>({});
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    AUDIO_SOURCES.forEach(({ name, frequency }) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      gain.gain.value = volumes[name] || 0;

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillatorsRef.current[name] = oscillator;
      gainsRef.current[name] = gain;
    });

    return () => {
      Object.values(oscillatorsRef.current).forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // Already stopped
        }
      });
    };
  }, []);

  const handleVolumeChange = (name: string, value: number) => {
    setVolumes((prev) => ({ ...prev, [name]: value }));

    if (gainsRef.current[name]) {
      gainsRef.current[name].gain.value = value * 0.1;
    }
  };

  return (
    <div className="absolute bottom-12 right-12 glass-panel p-6 rounded-xl w-72">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 size={20} className="text-primary" />
        <h3 className="font-semibold">Sound Mix</h3>
      </div>

      <div className="space-y-4">
        {AUDIO_SOURCES.map(({ name, emoji }) => (
          <div key={name} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <span>{name}</span>
              </label>
              <span className="text-xs text-white/50">
                {Math.round(volumes[name] * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes[name]}
              onChange={(e) => handleVolumeChange(name, Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        ))}
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
}

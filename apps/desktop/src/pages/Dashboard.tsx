import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, ProgressBar } from '@lifeos/ui';
import TaskMatrix from '../components/TaskMatrix';
import FinanceSparkline from '../components/FinanceSparkline';
import MorningBriefing from '../components/MorningBriefing';
import { useLifeStore } from '@lifeos/core';
import { Clock } from 'lucide-react';

export default function Dashboard(): JSX.Element {
  const { xp, level } = useLifeStore();
  const [weather, setWeather] = useState('Clear');
  const [temperature, setTemperature] = useState(72);

  useEffect(() => {
    const mockWeather = ['Clear', 'Cloudy', 'Rainy', 'Sunny'];
    setWeather(mockWeather[Math.floor(Math.random() * mockWeather.length)]);
    setTemperature(Math.floor(Math.random() * 30) + 60);
  }, []);

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-background via-background to-surface/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Wanderer</h1>
          <p className="text-white/50 flex items-center gap-2">
            <Clock size={16} />
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 auto-rows-max">
          <div className="col-span-4 row-span-2">
            <MorningBriefing weather={weather} temperature={temperature} />
          </div>

          <div className="col-span-4">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>XP Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/70">Level {level}</span>
                    <span className="text-sm font-bold text-primary">{xp} XP</span>
                  </div>
                  <ProgressBar percentage={Math.min((xp % 100) / 100 * 100, 100)} color="primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-4">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Daily Streak</span>
                    <span className="font-bold">🔥 7 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Tasks Today</span>
                    <span className="font-bold">3/8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-8">
            <TaskMatrix />
          </div>

          <div className="col-span-4">
            <FinanceSparkline />
          </div>
        </div>
      </div>
    </div>
  );
}

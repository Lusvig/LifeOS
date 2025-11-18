import { Card, CardHeader, CardTitle, CardContent } from '@lifeos/ui';
import { Cloud, Sun, Cloud as CloudRain } from 'lucide-react';

interface MorningBriefingProps {
  weather: string;
  temperature: number;
}

export default function MorningBriefing({
  weather,
  temperature,
}: MorningBriefingProps): JSX.Element {
  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType) {
      case 'Clear':
        return <Sun size={32} className="text-yellow-400" />;
      case 'Cloudy':
        return <Cloud size={32} className="text-gray-400" />;
      case 'Rainy':
        return <CloudRain size={32} className="text-blue-400" />;
      case 'Sunny':
        return <Sun size={32} className="text-yellow-400" />;
      default:
        return <Sun size={32} className="text-yellow-400" />;
    }
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Morning Briefing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Weather</p>
              <p className="text-2xl font-bold">{temperature}°F</p>
              <p className="text-white/50">{weather}</p>
            </div>
            <div>{getWeatherIcon(weather)}</div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-white/70 mb-2">One Thing</p>
            <div className="p-3 rounded-lg bg-white/5 border border-primary/20 hover:border-primary/40 transition-all">
              <p className="font-semibold text-primary mb-1">Complete Project Report</p>
              <p className="text-sm text-white/50">Due today at 5 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

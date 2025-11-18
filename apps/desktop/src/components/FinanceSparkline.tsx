import { Card, CardHeader, CardTitle, CardContent } from '@lifeos/ui';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const DATA = [
  { day: 'Mon', amount: 240 },
  { day: 'Tue', amount: 221 },
  { day: 'Wed', amount: 229 },
  { day: 'Thu', amount: 200 },
  { day: 'Fri', amount: 229 },
  { day: 'Sat', amount: 200 },
  { day: 'Sun', amount: 218 },
];

export default function FinanceSparkline(): JSX.Element {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={DATA}>
            <XAxis
              dataKey="day"
              stroke="#ffffff40"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#ffffff40"
              style={{ fontSize: '12px' }}
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(24, 24, 27, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#ffffff' }}
              formatter={(value) => [`$${value}`, 'Spent']}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              dot={false}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-white/70">Average Daily</p>
          <p className="text-xl font-bold text-accent">$220</p>
        </div>
      </CardContent>
    </Card>
  );
}

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { FormValues } from '../types';

interface StoryPointsData {
  month: string;
  data?: { [developerName: string]: number };
}

interface ChartDataPoint {
  month: string;

  [developerName: string]: number | string;
}

interface Props {
  data: StoryPointsData[];
  config: FormValues;
}

const COLORS = [
  '#60a5fa', // blue
  '#f87171', // red
  '#4ade80', // green
  '#facc15', // yellow
  '#a78bfa', // purple
  '#fb7185', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#ef4444', // red-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#f59e0b', // amber-500
];

const getChartTitle = () => {
  return 'Developer Story Points';
};

const getSubtitle = (config: FormValues) => {
  const timeType = config.timeType.value;
  return `Last ${config.timeNumber} ${timeType}${parseInt(config.timeNumber) > 1 ? 's' : ''}`;
};

export default function StoryPointsChart({ data, config }: Props) {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          color: '#6b7280',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
            No data available
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            No story points found for the selected time period and date type.
          </p>
        </div>
      </div>
    );
  }

  // Get all unique developers from the data
  const developers = Array.from(
    new Set(data.flatMap((monthData) => Object.keys(monthData.data || {}))),
  ).filter((dev) => (config.showUnassigned ? true : dev !== 'Unassigned'));

  // Transform data for recharts
  const chartData = data.map((monthData) => {
    const transformed: ChartDataPoint = { month: monthData.month };
    developers.forEach((dev) => {
      transformed[dev] = monthData.data?.[dev] || 0;
    });
    return transformed;
  });

  const ChartComponent = LineChart;

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#1f2937',
        minHeight: '500px',
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '8px',
          }}
        >
          {getChartTitle()}
        </h2>
        <p
          style={{
            color: '#9ca3af',
            fontSize: '14px',
          }}
        >
          {getSubtitle(config)}
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#374151',
          borderRadius: '8px',
          padding: '24px',
          border: '1px solid #4b5563',
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <ChartComponent
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '6px',
                color: 'white',
              }}
            />
            <Legend />

            {developers.map((developer, index) => (
              <Line
                key={developer}
                type="monotone"
                dataKey={developer}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </div>

      {developers.length === 0 && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '14px',
          }}
        >
          {config.showUnassigned
            ? 'No developers found with story points in the selected period.'
            : 'No assigned story points found. Try enabling "Show Unassigned Issues" in settings.'}
        </div>
      )}
    </div>
  );
}

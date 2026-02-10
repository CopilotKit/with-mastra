import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS, CHART_CONFIG } from './config';

interface BarChartProps {
  title: string;
  description: string;
  data: Array<{ label: string; value: number }>;
}

export function BarChart({ title, description, data }: BarChartProps) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="rounded-xl border shadow-sm p-6 max-w-2xl mx-auto my-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  // Add colors to data
  const coloredData = data.map((entry, index) => ({
    ...entry,
    fill: CHART_COLORS[index % CHART_COLORS.length]
  }));

  return (
    <div className="rounded-xl border shadow-sm p-6 max-w-2xl mx-auto my-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={coloredData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip contentStyle={CHART_CONFIG.tooltipStyle} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

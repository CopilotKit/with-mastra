import { PieChart as RechartsPieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS, CHART_CONFIG } from './config';

interface PieChartProps {
  title: string;
  description: string;
  data: Array<{ label: string; value: number }>;
}

export function PieChart({ title, description, data }: PieChartProps) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="rounded-xl border shadow-sm p-6 max-w-lg mx-auto my-6">
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
    <div className="rounded-xl border shadow-sm p-6 max-w-lg mx-auto my-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={coloredData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
          />
          <Tooltip contentStyle={CHART_CONFIG.tooltipStyle} />
        </RechartsPieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

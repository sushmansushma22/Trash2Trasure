import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WasteChart({ wasteData }) {
  const chartData = [];

  wasteData.forEach((item) => {
    const existing = chartData.find(
      (x) => x.name === item.wasteType
    );

    if (existing) {
      existing.value += Number(item.weight);
    } else {
      chartData.push({
        name: item.wasteType,
        value: Number(item.weight),
      });
    }
  });

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#a855f7",
    "#eab308",
    "#ef4444",
    "#14b8a6",
    "#6366f1",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-full">

      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Waste Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default WasteChart;
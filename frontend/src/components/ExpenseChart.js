import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {
  const data = [];

  // ✅ Aggregate total amount by category
  expenses.forEach((exp) => {
    const existing = data.find((d) => d.name === (exp.category || "Misc"));
    if (existing) {
      existing.value += Number(exp.amount);
    } else {
      data.push({ name: exp.category || "Misc", value: Number(exp.amount) });
    }
  });

  const COLORS = [
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#20c997",
  ];

  return (
    <div className="chart-page">
      <div className="chart-card">
        <h2>📊 Expense Breakdown by Category</h2>
        <div className="chart-wrapper">
          {data.length === 0 ? (
            <p>No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;

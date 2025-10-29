import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./Analytics.css";

function Analytics({ expenses }) {
  // ===== Pie Chart Data: Category-wise Total =====
  const categoryData = [];
  expenses.forEach((exp) => {
    const existing = categoryData.find((d) => d.name === exp.category);
    if (existing) {
      existing.value += Number(exp.amount);
    } else {
      categoryData.push({ name: exp.category, value: Number(exp.amount) });
    }
  });

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1", "#20c997"];

  // ===== Line Chart Data: Month-wise Total =====
  const monthlyTotals = {};
  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(exp.amount);
  });

  const lineData = Object.keys(monthlyTotals).map((month) => ({
    month,
    amount: monthlyTotals[month],
  }));

  return (
    <div className="analytics-page">
      <h1 className="analytics-title">📊 Expense Analytics Dashboard</h1>

      <div className="charts-grid">
        {/* ===== Pie Chart ===== */}
        <div className="chart-card">
          <h2>💸 Category-wise Expense Breakdown</h2>
          {categoryData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ===== Line Chart ===== */}
        <div className="chart-card">
          <h2>📆 Monthly Spending Trend</h2>
          {lineData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#007bff"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#007bff", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;

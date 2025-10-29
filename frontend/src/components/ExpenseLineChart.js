import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ExpenseLineChart({ expenses }) {
  const monthlyTotals = {};

  // ✅ Group by Month-Year
  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(exp.amount);
  });

  const data = Object.keys(monthlyTotals).map((month) => ({
    month,
    amount: monthlyTotals[month],
  }));

  return (
    <div className="line-chart-page">
      <div className="line-chart-card">
        <h2>📆 Monthly Spending Trend</h2>
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
  );
}

export default ExpenseLineChart;

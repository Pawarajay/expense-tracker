import React, { useState, useMemo } from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import ExportButton from "./ExportButton";

function ExpenseList({ expenses, deleteExpense, setEditingExpense }) {
  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(expenses.map((e) => e.category || "Misc"))];

  // Get unique months
  const months = ["All", ...new Set(
    expenses.map((e) =>
      new Date(e.date).toLocaleString("default", { month: "long", year: "numeric" })
    )
  )];

  // Apply filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const expenseMonth = new Date(e.date).toLocaleString("default", { month: "long", year: "numeric" });
      const monthMatch = monthFilter === "All" || expenseMonth === monthFilter;
      const categoryMatch = categoryFilter === "All" || (e.category || "Misc") === categoryFilter;
      return monthMatch && categoryMatch;
    });
  }, [expenses, monthFilter, categoryFilter]);

  return (
    <div className="expense-list">
      <h2>📅 Expenses</h2>

<ExportButton expenses={filteredExpenses} />

      {/* 🔹 Filters */}
      <div className="filters">
        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 🔹 Expense List */}
      {filteredExpenses.length === 0 ? (
        <p>No expenses found for selected filters.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            setEditingExpense={setEditingExpense}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;

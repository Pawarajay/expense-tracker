import React from "react";

function ExpenseItem({ expense, deleteExpense, setEditingExpense }) {
  return (
    <div className="expense-item">
      <div className="expense-details">
        <strong>{expense.title}</strong> — ₹{expense.amount}
        <small>
          {expense.category || "Misc"} |{" "}
          {new Date(expense.date).toLocaleDateString()}
        </small>
      </div>
      <div className="expense-actions">
        <button
          className="edit-btn"
          onClick={() => setEditingExpense(expense)}
        >
          ✏️ Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteExpense(expense.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;

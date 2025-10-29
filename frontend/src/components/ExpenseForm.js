import React, { useState, useEffect } from "react";

function ExpenseForm({ addExpense, editingExpense, updateExpense }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Food",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData(editingExpense);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
    } else {
      addExpense(formData);
    }
    setFormData({ title: "", amount: "", date: "", category: "Food" });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Health</option>
        <option>Others</option>
      </select>
      <button type="submit">{editingExpense ? "Update" : "Add"} Expense</button>
    </form>
  );
}

export default ExpenseForm;

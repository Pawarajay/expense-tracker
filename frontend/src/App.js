import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import Analytics from "./components/Analytics"; // ✅ new combined chart page

function App() {
  const [expenses, setExpenses] = useState([]);
  const [theme, setTheme] = useState("light");
  const [editingExpense, setEditingExpense] = useState(null);

  // ✅ Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Toggle theme (light/dark)
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  // ✅ Add new expense
  const addExpense = async (form) => {
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchExpenses();
  };

  // ✅ Update existing expense
  const updateExpense = async (id, form) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditingExpense(null);
    fetchExpenses();
  };

  // ✅ Delete expense
  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await fetch(`http://localhost:5000/api/expenses/${id}`, { method: "DELETE" });
      fetchExpenses();
    }
  };

  return (
    <Router>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="logo">💰 ExpenseTracker</div>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/list">Expense List</NavLink></li>
          <li><NavLink to="/analytics">Analytics</NavLink></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>

      {/* ✅ Routes */}
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                expenses={expenses}
                addExpense={addExpense}
                editingExpense={editingExpense}
                updateExpense={updateExpense}
                setEditingExpense={setEditingExpense}
              />
            }
          />
          <Route
            path="/list"
            element={
              <ExpenseList
                expenses={expenses}
                deleteExpense={deleteExpense}
                setEditingExpense={setEditingExpense}
              />
            }
          />
          <Route path="/analytics" element={<Analytics expenses={expenses} />} />
        </Routes>
      </div>
    </Router>
  );
}

// 🏠 Home Page Component
function Home({ expenses, addExpense, editingExpense, updateExpense, setEditingExpense }) {
  const [form, setForm] = useState({ title: "", amount: "", date: "", category: "" });

  useEffect(() => {
    if (editingExpense) setForm(editingExpense);
  }, [editingExpense]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date)
      return alert("Please fill all fields");

    if (editingExpense) await updateExpense(editingExpense.id, form);
    else await addExpense(form);

    setForm({ title: "", amount: "", date: "", category: "" });
  };

  const monthSummary = expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("default", { month: "long", year: "numeric" });
    acc[month] = (acc[month] || 0) + parseFloat(e.amount);
    return acc;
  }, {});

  return (
    <div className="home-layout">
      <div className="home-left">
        <h2>{editingExpense ? "✏️ Edit Expense" : "➕ Add New Expense"}</h2>
        <form className="expense-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
         <input
  name="amount"
  placeholder="Amount (₹)"
  type="number"
  value={form.amount || ""}
  onChange={(e) =>
    setForm({ ...form, amount: e.target.value.replace(/[^0-9.]/g, "") })
  }
/>

          {/* <input name="amount" placeholder="Amount (₹)" type="number" value={form.amount || ""} onChange={handleChange} /> */}
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <div className="form-buttons">
            <button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</button>
            {editingExpense && (
              <button type="button" onClick={() => setEditingExpense(null)} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="home-right">
        <h2>📊 Monthly Expense Summary</h2>
        <ul className="month-summary">
          {Object.entries(monthSummary).map(([month, total]) => (
            <li key={month}>
              <span>{month}</span>
              <span>₹{total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

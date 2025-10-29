const express = require("express");
const db = require("../db");

const router = express.Router();

// 🧾 GET all expenses (sorted by date DESC)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM expenses ORDER BY date DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({ error: "Failed to fetch expenses" });
    }
    res.json(result);
  });
});

// ➕ POST add new expense
router.post("/", (req, res) => {
  const { title, amount, date, category } = req.body;

  if (!title || !amount || !date || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO expenses (title, amount, date, category) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, amount, date, category], (err, result) => {
    if (err) {
      console.error("Error adding expense:", err);
      return res.status(500).json({ error: "Failed to add expense" });
    }

    const newExpense = { id: result.insertId, title, amount, date, category };
    res.status(201).json(newExpense);
  });
});

// ✏️ PUT update expense by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount, date, category } = req.body;

  if (!title || !amount || !date || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE expenses SET title = ?, amount = ?, date = ?, category = ? WHERE id = ?";
  db.query(sql, [title, amount, date, category, id], (err, result) => {
    if (err) {
      console.error("Error updating expense:", err);
      return res.status(500).json({ error: "Failed to update expense" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ success: true, message: "Expense updated successfully" });
  });
});

// ❌ DELETE expense by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM expenses WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting expense:", err);
      return res.status(500).json({ error: "Failed to delete expense" });
    }
    res.json({ success: true, message: "Expense deleted" });
  });
});

module.exports = router;

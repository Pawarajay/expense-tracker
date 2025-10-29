const API_URL = "http://localhost:5000/api/expenses";

export const getExpenses = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
};

export const addExpense = async (expense) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to add expense");
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete expense");
};

const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ajay@7039",
  database: "expense_tracker_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error(" MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

module.exports = db;

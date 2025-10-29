import React from "react";

function Navbar({ currentSection, setCurrentSection }) {
  return (
    <nav className="navbar">
      <h2 className="logo">💰 Expense Tracker</h2>
      <ul className="nav-links">
        <li
          className={currentSection === "add" ? "active" : ""}
          onClick={() => setCurrentSection("add")}
        >
          Add Expense
        </li>
        <li
          className={currentSection === "view" ? "active" : ""}
          onClick={() => setCurrentSection("view")}
        >
          View Expenses
        </li>
        <li
          className={currentSection === "charts" ? "active" : ""}
          onClick={() => setCurrentSection("charts")}
        >
          Charts
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

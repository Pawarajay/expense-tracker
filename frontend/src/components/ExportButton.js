import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./ExportButton.css";

function ExportButton({ expenses }) {
  const exportToExcel = () => {
    if (expenses.length === 0) {
      alert("No expenses to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `expenses_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const exportToCSV = () => {
    if (expenses.length === 0) {
      alert("No expenses to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `expenses_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="export-buttons">
      <button onClick={exportToCSV}>⬇️ Export CSV</button>
      <button onClick={exportToExcel}>📘 Export Excel</button>
    </div>
  );
}

export default ExportButton;

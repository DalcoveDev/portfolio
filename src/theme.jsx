import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("alphadestroyer-light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "alphadestroyer-light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "alphadestroyer-light" ? "alphadestroyer-dark" : "alphadestroyer-light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-primary">
      {theme === "alphadestroyer-light" ? "🌙" : "🔆"}
    </button>
  );
};

export default ThemeToggle;

import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    try {
      const res = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num1, num2, operation }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
        setError(null);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (err) {
      setError("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🧮 Kids Calculator</h1>

        <input
          type="text"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={styles.input}
        />

        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
        >
          <option value="add">➕ Add</option>
          <option value="subtract">➖ Subtract</option>
          <option value="multiply">✖ Multiply</option>
          <option value="divide">➗ Divide</option>
        </select>

        <button onClick={calculate} style={styles.button}>
          Calculate
        </button>

        {result !== null && (
          <h2 style={styles.result}>🎉 Result: {result}</h2>
        )}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: "350px",
    border: "3px solid #4CAF50",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#4CAF50",
    textShadow: "1px 1px 2px #ccc",
  },
  input: {
    padding: "12px",
    margin: "10px 0",
    width: "90%",
    borderRadius: "10px",
    border: "2px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "0.3s",
  },
  select: {
    padding: "12px",
    margin: "10px 0",
    width: "95%",
    borderRadius: "10px",
    border: "2px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 25px",
    marginTop: "15px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.3s",
  },
  result: {
    marginTop: "20px",
    color: "#2196F3",
    fontWeight: "bold",
  },
  error: {
    marginTop: "15px",
    color: "red",
    fontWeight: "bold",
  },
};

export default App;

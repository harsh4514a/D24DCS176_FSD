import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Store transactions locally (in a JSON file)
const FILE_PATH = "./transactions.json";

// Load existing transactions
let transactions = [];
if (fs.existsSync(FILE_PATH)) {
  transactions = JSON.parse(fs.readFileSync(FILE_PATH));
}

// Utility to save transactions
function saveTransactions() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(transactions, null, 2));
}

// Calculator endpoint
app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid input. Please enter numbers only." });
  }

  let result;
  switch (operation) {
    case "add":
      result = Number(num1) + Number(num2);
      break;
    case "subtract":
      result = Number(num1) - Number(num2);
      break;
    case "multiply":
      result = Number(num1) * Number(num2);
      break;
    case "divide":
      if (Number(num2) === 0) return res.status(400).json({ error: "Division by zero not allowed." });
      result = Number(num1) / Number(num2);
      break;
    default:
      return res.status(400).json({ error: "Invalid operation." });
  }

  const transaction = { num1, num2, operation, result, time: new Date() };
  transactions.push(transaction);
  saveTransactions();

  res.json({ result, transaction });
});

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

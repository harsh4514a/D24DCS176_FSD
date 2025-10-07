import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'del') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
        const evalResult = eval(input);
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'del', 'C', '+',
    '='
  ];

  return (
    <div className="container">
      <h2>Calculator</h2>
      <div className="display">
        <input type="text" value={input} readOnly className="input" />
        <div className="result">{result !== '' ? `= ${result}` : ''}</div>
      </div>
      <div className="buttonsContainer">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`button ${btn === '=' ? 'equals' : ''}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;

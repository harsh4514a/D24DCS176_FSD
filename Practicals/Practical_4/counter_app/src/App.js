import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const incrementFive = () => setCount(count + 5);

  return (
    <div className="counter-app" style={{ textAlign: 'center', marginTop: '200px' }}>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={incrementFive}>Increment 5</button>
      </div>

      <h1 style={{ marginTop: '40px' }}>Welcome to CHARUSAT!!!</h1>

      <div style={{ marginTop: '20px' }}>
        <label>
          First Name:&nbsp;
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          Last Name:&nbsp;
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: '30px' }}>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
      </div>
    </div>
  );
}

export default App;

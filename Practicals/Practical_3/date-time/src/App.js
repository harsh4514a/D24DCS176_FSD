import React, { useState, useEffect } from "react";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      flexDirection: "column", 
      fontFamily: "Arial, sans-serif" 
    }}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {dateString}</h2>
      <h2>It is {timeString}</h2>
    </div>
  );
}

export default App;

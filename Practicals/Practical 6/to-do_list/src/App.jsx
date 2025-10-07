import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("Low");
  const [editIndex, setEditIndex] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTaskInput(speechResult);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleAddOrUpdate = () => {
    if (!taskInput.trim()) return;

    const newTask = { text: taskInput, priority };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTaskInput("");
    setPriority("Low");
  };

  const handleEdit = (index) => {
    setTaskInput(tasks[index].text);
    setPriority(tasks[index].priority);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    setEditIndex(null);
    setTaskInput("");
    setPriority("Low");
  };

  const getPriorityClass = (level) => {
    switch (level) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
      default:
        return "priority-low";
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h2>✨ Task Manager</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleAddOrUpdate}>
            {editIndex !== null ? "Update" : "Add Task"}
          </button>
          <button
            className={`voice-btn ${isListening ? "listening" : ""}`}
            onClick={toggleListening}
            title="Toggle Voice Input"
          >
            {isListening ? "🎙️ Listening..." : "🎤 Voice Input"}
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-card">
              <div className="task-info">
                <span className="task-text">{task.text}</span>
                <span className={`priority-tag ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(index)}>✏️</button>
                <button onClick={() => handleDelete(index)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

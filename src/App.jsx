import { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const addTask = () => {
    if (text.trim() && dueDate && assignedTo) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: text.trim(),
          dueDate,
          assignedTo,
          completed: false,
        },
      ]);
      setText('');
      setDueDate('');
      setAssignedTo('');
    }
    else{
      let msg="These entries are still empty.\n \n"
      if(!text.trim())msg+="Name\n"
      if(!dueDate)msg+="Date \n"
      if(!assignedTo)msg+="assigned to \n"
      msg+="\nPlease fill these fields."
      alert(msg)
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText, newDueDate, newAssignedTo) => {
    setTasks(tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            text: newText,
            dueDate: newDueDate,
            assignedTo: newAssignedTo,
          }
        : task
    ));
  };
  

  return (
    <div className="app">
      <Header />
      <div className="input-section">
        <input
          type="text"
          placeholder="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={(new Date().toLocaleDateString('en-CA'))}
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ToDoList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;

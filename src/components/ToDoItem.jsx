import { useState } from 'react';

function ToDoItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [editAssignedTo, setEditAssignedTo] = useState(task.assignedTo);

  const handleEdit = () => {
    onEdit(task.id, editText, editDueDate, editAssignedTo);
    setIsEditing(false);
  };
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <input
              type="text"
              value={editAssignedTo}
              onChange={(e) => setEditAssignedTo(e.target.value)}
            />
            <button onClick={handleEdit}>Save</button>
          </>
        ) : (
          <>
            <span
              className="task-text"
              style={{ color:task.completed ? 'green':'red',textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <div className="task-meta">
              <small>Due: {task.dueDate}</small> | <small>Assigned To: {task.assignedTo}</small>
            </div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default ToDoItem;

import { useEffect, useState } from 'react';

import './App.css';
import './components/header/header.css';
import './components/input/input.css';
import './components/counter/counter.css';
import './components/filters/filters.css';
import './components/tasklist/tasklist.css';

import { InputArea } from './components/input/input';
import { Header } from './components/header/header';
import { Filters } from './components/filters/filters';
import { TaskCounter } from './components/counter/counter';
import { ListItem } from './components/tasklist/tasklist';

function App() {
  const [inputText, setText] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedData = localStorage.getItem('tasks');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  function onAdd() {
    if (inputText.trim() === '') {
      return alert('Пустое поле задач');
    }
    setTasks((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          text: inputText.trim(),
          completed: false,
          createdAt: Date.now(),
        },
      ];
    });
    setText('');
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      return onAdd();
    }
  }

  function isChecked(id) {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });
    });
  }

  function handleDelete(id) {
    setTasks((prev) => {
      return prev.filter((task) => task.id !== id);
    });
  }

  function handleFilter(value) {
    setFilter(value);
  }

  function handleClear() {
    setTasks((prev) => {
      return prev.filter((task) => !task.completed);
    });
    setFilter('all');
  }

  function handleEditing(id, text) {
    setEditingId(id);
    setEditText(text);
  }

  function handleSave() {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === editingId) {
          return { ...task, text: editText };
        } else {
          return task;
        }
      });
    });
    setEditingId(null);
  }

  function saveChanges(e) {
    if (e.key === 'Enter') {
      return handleSave();
    }
  }

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className="page-wrapper">
      <Header />
      <div className="main">
        <div className="task-area">
          <InputArea inputText={inputText} setText={setText} onAdd={onAdd} onKeyDown={onKeyDown} />
          <div className="all-tasks">
            <Filters filter={filter} handleFilter={handleFilter} handleClear={handleClear} />
            <TaskCounter total={total} completed={completed} />
            <ul className="all-tasks_tasklist">
              {filteredTasks.map((task) => (
                <ListItem
                  key={task.id}
                  task={task}
                  isChecked={isChecked}
                  isEditing={editingId === task.id}
                  editText={editText}
                  setEditText={setEditText}
                  handleDelete={handleDelete}
                  handleEditing={handleEditing}
                  handleSave={handleSave}
                  saveChanges={saveChanges}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

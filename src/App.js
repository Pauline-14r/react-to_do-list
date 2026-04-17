import { useState } from "react";
import './App.css';
import logo from "./pictures/logo.svg";
import addIcon from "./pictures/add_plus.svg";
import trash from "./pictures/trash.svg"

function App() {
	const [inputText, setText] = useState("");
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState("all");
	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") {
			return true;
		}; 
		if (filter === "completed") {
			return task.completed;
		};
		if (filter === "active") {
			return !task.completed;
		};
		return true;
	});
	
	function onAdd() {
		if (inputText.trim() === "") {
			return alert("Пустое поле задач");
		}
		setTasks((prev) => {
			return [...prev, {
				id: Date.now(),
				text: inputText.trim(),
				completed: false
			}];
		});
		setText("")
	}

	function onKeyDown(e) {
		if (e.key === "Enter") {
			return onAdd();
		}
	}

	function isChecked(id) {
		setTasks((prev) => {
			return prev.map((task) => {
				if (task.id === id) {
					return {...task, completed: !task.completed}
				} else {
					return task
				}
			})
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
			return prev.filter((task) => !task.completed)
		});
		setFilter("all");
	}

	const total = tasks.length;
	const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className="page-wrapper">
			<Header />
			<div className="main">
				<div className="task-area">
					<InputArea
						inputText={inputText}
						setText={setText}
						onAdd={onAdd}
						onKeyDown={onKeyDown} />
					<div className="all-tasks">
						<div className="all-tasks_tasks-filter">
							<div className="all-tasks_visible-buttons">
								<button className="all-tasks_button" onClick={() => handleFilter("all")}>Все задачи</button>
								<button className="all-tasks_button" onClick={() => handleFilter("completed")}>Завершенные</button>
								<button className="all-tasks_button" onClick={() => handleFilter("active")}>В процессе</button>
								</div>
							{filter === "completed" && <button className="all-tasks_button" onClick={() => handleClear()}>
								Очистить
								</button>}
						</div>
						<div className="all-tasks_counter">
							<span className="all-tasks_counter-text">Всего задач <span className="counter">{total}</span></span>
							<span className="all-tasks_counter-text">Завершено <span className="counter">{completed}{" "}из{" "}{total}</span></span>
						</div>
						<ul className="all-tasks_tasklist">
							{filteredTasks.map((task) =>
								<li className="all-tasks_list-item" key={task.id}>
									<div className="all-tasks_left-area">
										<input className="all-tasks_checkbox" type="checkbox" checked={task.completed} onClick={() => isChecked(task.id)}/>
										<span className={task.completed ? "all-tasks_task-completed" : ""}>{task.text}</span>
									</div>
									<div className="all-tasks_right-area">
										<button className="trash-button" onClick={() => handleDelete(task.id)}><img src={trash} alt="trash"/>
										</button>
									</div>
									</li>)}
						</ul>
					</div>
				</div>
			</div>
    </div>
  );
}

function InputArea({inputText, setText, onAdd, onKeyDown}) {
	return (
		<div className="input-area">
		<input
			className="input-area_input" 
			value = {inputText}
			onChange={(e) => setText(e.target.value)}
			onKeyDown={onKeyDown}
			placeholder="Добавить новую задачу"></input>
			<button 
			className="input-area_button"
			onClick={onAdd}
			>Добавить <img src={addIcon} alt="add_plus"></img></button>
		</div>
	)
}

function Header() {
	return (
		<div className="header">
			<span className="header_logo-wrapper"><img src={logo} alt="logo" /></span>
		</div>
	)
}


export default App;

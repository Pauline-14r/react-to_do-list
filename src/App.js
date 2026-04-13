import { useState } from "react";
import './App.css';
import logo from "./pictures/logo.svg";

function App() {
	const [inputText, setText] = useState('');
	const [tasks, setTasks] = useState([]);
	
	function onAdd() {
		if (inputText.trim() === '') {
			return alert('Пустое поле задач');
		}
		setTasks((prev) => {
			return [...prev, inputText.trim()]
		});
		setText('')
	}

	function onKeyDown(e) {
		if (e.key === 'Enter') {
			return onAdd();
		}
	}

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
					<ul>
						{tasks.map((task, index) => <li key={index}>{task}</li>)}
					</ul>
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
			placeholder='Добавить новую задачу'></input>
			<button 
			className="input-area_button"
			onClick={onAdd}
			>Добавить</button>
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

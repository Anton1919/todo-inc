import React from 'react';
import TodoList from "./TodoList";
import './App.css';

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

function App() {
	const todoListTitle_1: string = "What to learn"
	const todoListTitle_2: string = 'What to buy'
	const tasks_1: Array<TaskType> = [
		{id: 1, title: "HTML & CSS", isDone: true},
		{id: 2, title: "JS", isDone: true},
		{id: 3, title: "React", isDone: false},

	]

	const task_2: Array<TaskType> = [
		{id: 4, title: "apple", isDone: true},
		{id: 5, title: "milk", isDone: true},
		{id: 6, title: "cola", isDone: false},
	]

	return (
		<div className="App">
			<TodoList title={todoListTitle_1} tasks={tasks_1}/>
			<TodoList title={todoListTitle_2} tasks={task_2}/>
		</div>
	);
}

export default App;

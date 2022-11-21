import React, {useState} from 'react';
import TodoList from "./TodoList";
import './App.css';
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | "active" | 'completed'

function App() {
	const todoListTitle: string = "What to learn"

	const [tasks, setTasks] = useState<Array<TaskType>>([
		{id: v1(), title: "HTML & CSS", isDone: true},
		{id: v1(), title: "JS", isDone: true},
		{id: v1(), title: "React", isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>("all")

	const removeTask = (taskId: string) => {
		const updatedTasks = tasks.filter(task => task.id !== taskId)
		setTasks(updatedTasks)
	}

	const addTask = (title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title,
			isDone: false
		}
		setTasks([newTask, ...tasks])
	}

	const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
		setFilter(nextFilterValue)
	}

	const getFilteredTasks =
		(tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {

			switch (filter) {
				case "completed":
					return tasks.filter(task => task.isDone)
				case "active":
					return tasks.filter(task => !task.isDone)
				default:
					return tasks
			}
		}

		const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

	return (
		<div className="App">
			<TodoList
				tasks={filteredTasks}
				changeTodoListFilter={changeTodoListFilter}
				remove={removeTask}
				title={todoListTitle}
				addTask={addTask}
			/>
		</div>
	);
}

export default App;

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
	title: string
	addTask: (title: string) => void
	tasks: Array<TaskType>
	filter: FilterValuesType
	remove: (taskId: string) => void
	changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

	const [title, setTitle] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const tasksListItem =
		props.tasks.length ?
		props.tasks.map((task: TaskType) => {
		const removeTask = () => props.remove(task.id)
		const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeTaskStatus(task.id, e.currentTarget.checked)
		}

		return (
			<li key={task.id}>
				<input type="checkbox"
							 checked={task.isDone}
							 onChange={changeTaskStatus}
				/>
				<span className={task.isDone ? 'task-done' : ''}>{task.title}</span>
				<button onClick={removeTask}>x</button>
			</li>
		)
	}) : <span>Create your task</span>

	const addTask = () => {
		const trimmedTitle = title.trim()
		if(trimmedTitle) {
			props.addTask(trimmedTitle)
		} else {
			setError(true)
		}
		setTitle('')
	}

	const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false)
		setTitle(e.currentTarget.value)
	}
	const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter")
			addTask()
	}

	const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter)

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input
					className={error? "input-error" : ''}
					value={title}
					onKeyDown={onEnterAddTask}
					onChange={setLocalTitle}/>
				<button onClick={addTask}>+</button>
				{error && <div style={{fontWeight: 'bold', color:'red'}}>Enter anything</div>}
			</div>
			<ul>
				{tasksListItem}
			</ul>
			<div>
				<button
					className={props.filter === "all" ? "btn-active" : ''}
					onClick={onClickHandlerCreator('all')}>All</button>
				<button
					className={props.filter === "active" ? "btn-active" : ''}
					onClick={onClickHandlerCreator('active')}>Active</button>
				<button
					className={props.filter === "completed" ? "btn-active" : ''}
					onClick={onClickHandlerCreator('completed')}>Completed</button>
			</div>
		</div>
	);
};

export default TodoList;
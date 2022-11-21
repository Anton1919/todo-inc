import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
	title: string
	addTask: (title: string) => void
	tasks: Array<TaskType>
	remove: (taskId: string) => void
	changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {

	const [title, setTitle] = useState('')

	const tasksListItem = props.tasks.map((task: TaskType) => {
		const removeTask = () => props.remove(task.id)
		return (
			<li key={task.id}>
				<input type="checkbox" checked={task.isDone}/>
				<span>{task.title}</span>
				<button onClick={removeTask}>x</button>
			</li>
		)
	})

	const addTask = () => {
		props.addTask(title)
		setTitle('')
	}
	const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
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
					value={title}
					onKeyDown={onEnterAddTask}
					onChange={setLocalTitle}/>
				<button onClick={addTask}>+</button>
			</div>
			<ul>
				{tasksListItem}
			</ul>
			<div>
				<button onClick={onClickHandlerCreator('all')}>All</button>
				<button onClick={onClickHandlerCreator('active')}>Active</button>
				<button onClick={onClickHandlerCreator('completed')}>Completed</button>
			</div>
		</div>
	);
};

export default TodoList;
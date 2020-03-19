import React from 'react';
import Container from 'react-bootstrap/Container';
import TodoItemStore from '../utils/TodoItemStore';
import FilteredTodoList, { FILTERS } from './FilteredTodoList';
import EnterInput from './EnterInput';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.todoItemStore = new TodoItemStore();
		const todoItems = this.todoItemStore.getItems();

		// variables in state are only those that are the minimal
		// representation of the ui.
		this.state = {
			todoItems,
		};
	}

	addTodoItem(itemText) {
		this.todoItemStore.add(itemText);
		const todoItems = this.todoItemStore.getItems();
		this.setState({ todoItems });
	}

	removeTodoItem(item) {
		this.todoItemStore.remove(item.itemKey);
		const todoItems = this.todoItemStore.getItems();
		this.setState({ todoItems });
	}

	setDoneTodoItem(targetItem, isDone) {
		this.todoItemStore.setDone(targetItem.itemKey, isDone);
		const todoItems = this.todoItemStore.getItems();
		this.setState({ todoItems });
	}

	render() {
		const { todoItems } = this.state;

		return (
			<Container className="todo-app">
				<h1 className="bd-title">Todos</h1>
				<EnterInput desc="What do you want to do?" onEnter={itemText => this.addTodoItem(itemText)} />
				<FilteredTodoList
					todoItems={todoItems}
					defaultFilter={FILTERS.ALL}
					onSetDoneTodoItem={(todoItem, isDone) => this.setDoneTodoItem(todoItem, isDone)}
					onRemoveTodoItem={todoItem => this.removeTodoItem(todoItem)}
				/>
			</Container>
		);
	}
}

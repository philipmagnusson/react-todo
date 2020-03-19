import React from 'react';
import Container from 'react-bootstrap/Container';
import TodoItemStore from '../utils/TodoItemStore';
import FilteredTodoList, { FILTERS } from './FilteredTodoList';
import EnterInput from './EnterInput';
import './App.css';

const SOME_ITEMS = 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'.split(
  ' '
);

const PAGE_SIZE = 5;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.todoItemStore = new TodoItemStore();

    SOME_ITEMS.forEach(item => this.todoItemStore.add(item));

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
          pageSize={PAGE_SIZE}
          onSetDoneTodoItem={(todoItem, isDone) => this.setDoneTodoItem(todoItem, isDone)}
          onRemoveTodoItem={todoItem => this.removeTodoItem(todoItem)}
        />
      </Container>
    );
  }
}

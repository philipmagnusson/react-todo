import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from './TodoItem';

const TodoList = props => {
  const { todoItems } = props;

  return (
    <ListGroup>
      {todoItems.map(todoItem => (
        <TodoItem
          key={todoItem.itemKey}
          todoItem={todoItem}
          onSetDone={isDone => props.onSetDoneTodoItem(todoItem, isDone)}
          onRemove={() => props.onRemoveTodoItem(todoItem)}
        />
      ))}
    </ListGroup>
  );
};

export default TodoList;

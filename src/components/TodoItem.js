import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './TodoItem.css';

const TodoItem = props => {
  const { todoItem, onSetDone, onRemove } = props;
  const { itemText, isDone } = todoItem;

  return (
    <ListGroup.Item className="d-flex">
      <button
        className={'mr-3 oi ' + (isDone ? 'oi-task' : 'oi-target')}
        data-testid="doneButton"
        onClick={() => onSetDone(!isDone)}
      ></button>
      <div className={'flex-fill ' + (isDone ? ' todo-item-done' : '')}>{itemText}</div>
      <button className="ml-3 oi oi-trash" data-testid="removeButton" onClick={onRemove}></button>
    </ListGroup.Item>
  );
};

export default TodoItem;

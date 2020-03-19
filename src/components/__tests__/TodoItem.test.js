import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoItem from '../TodoItem';

afterEach(cleanup);

describe('TodoItem', () => {
  it('triggers onSetDone when done is clicked and item is not done', () => {
    const todoItem = {
      itemKey: 5,
      itemText: 'go to bed',
      isDone: false,
    };

    const onSetDone = jest.fn();

    const { getByTestId } = render(<TodoItem todoItem={todoItem} onSetDone={onSetDone} />);

    const doneButton = getByTestId('doneButton');
    fireEvent.click(doneButton);
    console.log(doneButton.innerHTML);

    expect(onSetDone).toHaveBeenCalledWith(true);
  });

  it('triggers onSetDone when done is clicked and item is done', () => {
    const todoItem = {
      itemKey: 5,
      itemText: 'go to bed',
      isDone: true,
    };

    const onSetDone = jest.fn();

    const { getByTestId } = render(<TodoItem todoItem={todoItem} onSetDone={onSetDone} />);

    const doneButton = getByTestId('doneButton');
    fireEvent.click(doneButton);
    console.log(doneButton.innerHTML);

    expect(onSetDone).toHaveBeenCalledWith(false);
  });

  it('triggers onRemove when removeButton is clicked', () => {
    const todoItem = {
      itemKey: 5,
      itemText: 'go to bed',
      isDone: true,
    };

    const onRemove = jest.fn();

    const { getByTestId } = render(<TodoItem todoItem={todoItem} onRemove={onRemove} />);

    const removeButton = getByTestId('removeButton');
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalled();
  });

  it('renders itemText', () => {
    // ....
  });
});

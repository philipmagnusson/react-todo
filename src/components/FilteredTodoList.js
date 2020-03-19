import React, { useState } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import PaginatedTodoList from './PaginatedTodoList';

const FilterSelector = props => {
  const { filters, activeFilter, onSelectFilter } = props;

  return (
    <ToggleButtonGroup name="filters" type="radio" value={activeFilter} onChange={onSelectFilter}>
      {filters.map(filterValue => (
        <ToggleButton variant="secondary" key={filterValue} value={filterValue}>
          {filterValue}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const FILTERS = {
  COMPLETED: 'completed',
  ACTIVE: 'active',
  ALL: 'all',
};

const filterItems = (todoItems, filter) => {
  if (filter === FILTERS.ALL) {
    return todoItems;
  }
  return todoItems.filter(todoItem => {
    return filter === FILTERS.COMPLETED ? todoItem.isDone : !todoItem.isDone;
  });
};

const FilteredTodoList = props => {
  const { todoItems } = props;
  const [activeFilter, setActiveFilter] = useState(props.defaultFilter);

  const filters = Object.values(FILTERS);
  const todoItemsCount = todoItems.length;
  const filteredTodoItems = filterItems(todoItems, activeFilter);

  // I would want to throw in whatever list here but I don't know how to do that because
  // the items are controlled by this component, maybe higher order component, haven't looked into that.
  return (
    <div>
      <div className="my-2">
        <PaginatedTodoList
          todoItems={filteredTodoItems}
          onSetDoneTodoItem={(todoItem, isDone) => props.onSetDoneTodoItem(todoItem, isDone)}
          onRemoveTodoItem={todoItem => props.onRemoveTodoItem(todoItem)}
          pageSize={props.pageSize}
        />
      </div>
      {todoItemsCount > 0 && (
        <div className="d-flex flex-wrap p-2 my-2 align-items-center justify-content-between border rounded">
          <div className="ml-2 font-weight-light">items left: {todoItemsCount}</div>
          <FilterSelector
            filters={filters}
            activeFilter={activeFilter}
            onSelectFilter={filter => setActiveFilter(filter)}
          />
        </div>
      )}
    </div>
  );
};

export default FilteredTodoList;
export { FILTERS, FilterSelector };

import React from 'react';
import TodoList from './TodoList';
import Button from 'react-bootstrap/Button';

/**
 * @returns an array of the paged items [[item_p1_1, ..., item_p1_N], [item_p2_1, ... item_p3_N], ..., [item_pN_1, ... item_pN_N]]
 * or an array of one empty page ([[]]) if there are no items.
 */
const pageItems = (items, pageSize) => {
  if (items.length === 0) {
    return [[]];
  }

  const pages = [];
  const itemsCopy = [...items];
  while (itemsCopy.length) {
    pages.push(itemsCopy.splice(0, pageSize));
  }
  return pages;
};

const PageSelector = props => {
  const { selectedPage, pagesCount, onSelectPage } = props;

  const pageIndexes = [];
  for (let i = 1; i <= pagesCount; i++) {
    pageIndexes.push(i);
  }

  return (
    <ol className="list-inline mb-1 page-selector">
      {pageIndexes.map(pageIndex => (
        <li key={pageIndex} className="list-inline-item">
          <Button
            variant="link"
            disabled={selectedPage && pageIndex === selectedPage}
            className="p-1"
            onClick={() => onSelectPage(pageIndex)}
          >
            {pageIndex}
          </Button>
        </li>
      ))}
    </ol>
  );
};

export default class PaginatedTodoList extends React.Component {
  constructor(props) {
    super(props);

    // save the minium props in state, the paged items can be calculated based on this and props.todoItems.
    this.state = {
      selectedPage: 1,
    };
  }

  // we need this because if selectedPage is the last page forexample and the last item is removed
  // then we need to select the previous page, and also save that in the state so that it's remembered.
  static getDerivedStateFromProps(props, state) {
    const todoItemPages = pageItems(props.todoItems, props.pageSize);
    if (todoItemPages.length === 1 && todoItemPages[0].length === 0) {
      return { selectedPage: 1 };
    } else {
      const prevSelectedPage = state.selectedPage;
      // max page selected is equal to pagedTodoItems.length because selectedPage is indexed from 1.
      return {
        selectedPage: todoItemPages.length < prevSelectedPage ? todoItemPages.length : prevSelectedPage,
      };
    }
  }

  render() {
    const { selectedPage } = this.state;
    const todoItemPages = pageItems(this.props.todoItems, this.props.pageSize);

    // I really would like to be able to throw in whatever list here, but I don't know how to do that.
    // And I would like to have the list and the controllers, such as pageSelector separated in HTML
    // but I don't know how to do that in react. Maybe portals.
    return (
      <>
        <TodoList
          todoItems={todoItemPages[selectedPage - 1]}
          onSetDoneTodoItem={(todoItem, isDone) => this.props.onSetDoneTodoItem(todoItem, isDone)}
          onRemoveTodoItem={todoItem => this.props.onRemoveTodoItem(todoItem)}
        />
        <div className="d-flex flex-wrap p-2 my-2 align-items-center justify-content-between border rounded">
          {todoItemPages.length > 1 && (
            <PageSelector
              pagesCount={todoItemPages.length}
              selectedPage={selectedPage}
              onSelectPage={pageIndex => this.setState({ selectedPage: pageIndex })}
            />
          )}
        </div>
      </>
    );
  }
}

export { PageSelector };

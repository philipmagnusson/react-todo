import React from 'react';
//import { render, fireEvent, cleanup } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';
import TodoList from '../TodoList';
jest.mock('../TodoItem', () => todoItem => <div>{todoItem}</div>);

const TODO_ITEMS = [
	{
		itemKey: 1,
		itemText: 'brush teeth',
	},
	{
		itemKey: 2,
		itemText: 'wash face',
	},
	{
		itemKey: 3,
		itemText: 'go to bed',
	},
];

//afterEach(cleanup);

// Test needs to be fixed..
it.skip('renders todoItems', () => {
	expect(TestRenderer.create(<TodoList todoItems={TODO_ITEMS} />).toJSON).toMatchSnapshot();
});

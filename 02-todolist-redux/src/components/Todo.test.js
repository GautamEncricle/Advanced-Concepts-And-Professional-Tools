import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/app/store'; 
import TodoApp from './TodoApp';

describe('TodoApp - Base Testing', () => {
  test('renders input and add button', () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const input = screen.getByTestId('todo-input');
    expect(input).toBeInTheDocument();

    const addButton = screen.getByText(/add/i);
    expect(addButton).toBeInTheDocument();
  });

  test('can type in input', () => {
    render(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    expect(input.value).toBe('Buy milk');
  });
});

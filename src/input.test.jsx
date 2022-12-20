import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const newTodo = 'newTodo';

  const setNewTodos = jest.fn();

  const addTodo = jest.fn();

  const { container, getByText, getByDisplayValue } = render(
    <Input value={newTodo} onChange={setNewTodos} onClick={addTodo} />
  );

  expect(setNewTodos).not.toBeCalled();

  expect(addTodo).not.toBeCalled();

  expect(container).toHaveTextContent('추가');

  expect(getByDisplayValue('newTodo')).toHaveValue('newTodo');

  fireEvent.change(getByDisplayValue('newTodo'), {
    target: { value: { newTodo } },
  });

  expect(setNewTodos).toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(addTodo).toBeCalled();
});

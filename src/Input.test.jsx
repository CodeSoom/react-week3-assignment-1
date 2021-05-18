import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('add Todo', () => {
  const handleClickAddTodo = jest.fn();

  const { container, getByText } = render(
    (
      <Input onClick={handleClickAddTodo} />
    ),
  );

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleClickAddTodo).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClickAddTodo).toBeCalled();
});

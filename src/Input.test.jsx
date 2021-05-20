import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('addTodo', () => {
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input />
  ));

  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
});

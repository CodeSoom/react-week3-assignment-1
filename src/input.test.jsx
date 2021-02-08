import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

test('Input', () => {
  const onClick = jest.fn();

  const { container, getByText } = render((
    <Input />
  ));

  expect(container).toHaveTextContent('할 일');

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = {
    id: 1,
    text: '할 일 1',
  };
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText } = render(
    <Input value={value} onClick={handleClick} onChange={handleChange} />
  );

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
});

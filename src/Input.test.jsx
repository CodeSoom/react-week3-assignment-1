import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';
  const handleChangText = jest.fn();
  const handleClick = jest.fn();

  const { container } = render((
    <Input
      value={value}
      onChange={handleChangText}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
});

test('InputWitValue', () => {
  const value = '첫 번째 할 일';
  const handleChangText = jest.fn();
  const handleClick = jest.fn();

  const { getByLabelText } = render((
    <Input
      value={value}
      onChange={handleChangText}
      onClick={handleClick}
    />
  ));

  const input = getByLabelText('할 일');

  expect(input.value).toBe('첫 번째 할 일');
});

test('InputValueChange', () => {
  const value = '';
  const handleChangText = jest.fn();
  const handleClick = jest.fn();

  const { getByLabelText } = render((
    <Input
      value={value}
      onChange={handleChangText}
      onClick={handleClick}
    />
  ));

  fireEvent.change(getByLabelText('할 일'), { target: { value: '첫 번째 할 일' } });

  expect(handleChangText).toBeCalled();
});

test('ClickAddTask', () => {
  const value = '';
  const handleChangText = jest.fn();
  const handleClick = jest.fn();

  const { getByText } = render((
    <Input
      value={value}
      onChange={handleChangText}
      onClick={handleClick}
    />
  ));

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});

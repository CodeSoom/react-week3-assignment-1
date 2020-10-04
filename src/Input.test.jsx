import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';

  const onChange = jest.fn();

  const onClick = jest.fn();

  const { container, getByText } = render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));

  fireEvent.onChange(getByText('어떤 할일 입력 중'));

  expect(onChange).toBeCalledWith('어떤 할일 입력 중');

  fireEvent.click(getByText('추가'));

  expect(container).toHaveTextContent('');
});
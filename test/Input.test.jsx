import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from '../src/Input';

test('Input', () => {
  const props = {
    value: 'PR 보내기',

  };

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input
      value={props.value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toContainHTML('<label');
  expect(container).toHaveTextContent('할 일');

  expect(container).toContainHTML('<input');

  expect(container).toContainHTML('<button');
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});

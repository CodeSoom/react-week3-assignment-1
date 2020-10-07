import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';
  const onChange = jest.fn;
  const onClick = jest.fn;

  const { container, getByText, queryByPlaceholderText } = render((
    <Input
      value={value}
      placeholder="할 일을 입력해주세요"
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const searchInput = queryByPlaceholderText('할 일을 입력해주세요');
  fireEvent.change(searchInput, { target: { value: '뭐라도 하기' } });
  expect(searchInput.value).toBe('뭐라도 하기');

  const button = getByText('추가');

  expect(onClick).not.toBeCalled();
  fireEvent.click(button);
  expect(onClick).toBeCalled();
});

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const text = '뭐라도 해보기';
  const onChange = jest.fn;
  const onClick = jest.fn;

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={text}
      placeholder="할 일을 입력해 주세요"
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const searchInput = getByPlaceholderText('할 일을 입력해 주세요');
  expect(searchInput.value).toMatch('뭐라도 해보기');

  fireEvent.change(searchInput, { target: { value: '이렇게 잘되네' }});
  expect(searchInput.value).toBe('이렇게 잘되네');

  const button = getByText('추가');

  expect(onClick).not.toBeCalled(null);
  fireEvent.click(button);
  expect(onClick).toBeCalled('뭐라도 해보기');
});

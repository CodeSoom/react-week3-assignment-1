import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value="뭐라도 해보기"
      placeholder="할 일을 입력해 주세요"
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const searchInput = getByPlaceholderText('할 일을 입력해 주세요');
  expect(searchInput.value).toBe('뭐라도 해보기');

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(onClick).toBeCalled();
});

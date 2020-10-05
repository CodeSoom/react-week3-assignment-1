import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const textInput = '뭐라도 하기';
  const onChange = jest.fn;

  const {container, getByText } = render((
    <Input
      value={textInput}
      placeholder={"할 일을 입력해주세요."}
      onChange={onChange}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const button = getByText('추가');

  expect(value).not.toBeCalledWith('');
  fireEvent.input(value);
  expect(value).toBeCalledWith('뭐라도 하기');

  expect(onClick).not.toBeCalled();
  fireEvent.click(button);
  expect(onClick).toBeCalled();
});
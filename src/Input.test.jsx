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

  // Basic Test
  // value 값이 비어 있는 것을 체크하기
  expect(value).toHaveValue('');
  expect(container).toHaveTextContent('할 일');

  // onChange Test
  // onChange로 할일을 입력 후 적용되었는지 체크하기
  fireEvent.change(getByText('어떤 할일 입력 중'));
  expect(onChange).toBeCalledWith('어떤 할일 입력 중');

  // onClick Test
  // onClick 후 value 값이 비어있는지 확인하기
  fireEvent.click(getByText('추가'));
  expect(value).toHaveValue('');
});

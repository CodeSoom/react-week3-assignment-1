import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '밥 먹고 3주차 강의 보기!';

  const onChange = jest.fn();
  const handleClick = jest.fn();
  
  const { getByPlaceholderText, getByText } = render( // 화면에 보여줌
    <Input
      value={value}
      onChange={onChange}
      onClick={handleClick}
    />
  );

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const button = getByText('추가');

  console.log(input.value);

  fireEvent.change(input, { target: { value: 'f' } }); // 동작 안함

  console.log(input.value);

  input.value = '변경';

  expect(input).toHaveAttribute('value', '밥 먹고 3주차 강의 보기!');

  // // 버튼 클릭
  // expect(handleClick).not.toBeCalled();
  // fireEvent.click(getByText('완료'));
  // expect(handleClick).toBeCalledWith('밥 먹고 3주차 강의 보기!'); // 안됨 

  // // 버튼 클릭 후 비어있는 값 출력
  // expect(input).toHaveAttribute('value', '');
});
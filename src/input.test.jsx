import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const handleChange = jest.fn();
const handleClick = jest.fn();
const renderInput = (value = '') => render(
  <Input
    value={value}
    onChange={handleChange}
    onClick={handleClick}
  />,
);

test('컴포넌트 렌딩 시, labal, placeholder, button 텍스트를 출력한다.', () => {
  const { getByText, getByPlaceholderText } = render(<Input />);

  expect(getByText('할 일')).toBeInTheDocument();
  expect(getByText('추가')).toBeInTheDocument();
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
});

test('추가 버튼 클릭 시, onClick()가 호출된다.', () => {
  const { getByText } = renderInput();

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});

test('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
  const { getByLabelText } = renderInput();

  const input = getByLabelText('input-task-title');
  console.log(input);
  const inputTitle = '캠핑하기';

  fireEvent.change(
    input,
    {
      selector: 'input',
      target: { value: inputTitle },
    },
  );

  expect(input.value).toBe(inputTitle);
});

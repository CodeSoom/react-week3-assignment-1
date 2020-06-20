import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      // value={taskTitle}
      onChange={onChange}
      onClick={handleClick}
    />
  ));

  expect(onChange).not.toBeCalled();
  expect(handleClick).not.toBeCalled();

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  // [v] TODO: input태그의 placeholder "할 일을 입력해주세요" 테스트
  const input = getByPlaceholderText('할 일을 입력해 주세요');
  expect(input).toBeEnabled();

  // [?] TODO: input 태그에 뭔가를 적었을 경우 onChange 호출을 통해 value가 바뀌는지 테스트
  fireEvent.change(input, { target: { value: 'something' } });
  expect(input.value).toBe('something');
  fireEvent.change(input, { target: { value: 'something' } });
  expect(input.value).not.toBe('else');
  expect(onChange).toBeCalled();

  // [ ] TODO: onClick을 클릭했을 경우 value가 사리지는가 테스트
  // expect(handleClick).toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});

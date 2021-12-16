import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input 컴포넌트에 props로 전달된 이벤트 핸들러가 정상적으로 호출된다.', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <Input
      onChange={handleChange}
      onClick={handleClick}
      value=""
    />,
  );
  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
    target: { value: '일기쓰기' },
  });
  expect(handleChange).toBeCalled();
});

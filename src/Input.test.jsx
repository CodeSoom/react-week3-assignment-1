import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input 이벤트 리스너 테스트', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <Input onChange={handleChange} onClick={handleClick} value="" />,
  );

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
    target: { value: '일기쓰기' },
  });

  expect(handleChange).toBeCalled();
});

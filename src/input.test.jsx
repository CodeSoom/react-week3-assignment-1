import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '공부하기';
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText, getByPlaceholderText } = render(
    <Input value={value} onClick={handleClick} onChange={handleChange} />
  );

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  fireEvent.change(input, {
    target: {
      value: '공부하기',
    },
  });
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});

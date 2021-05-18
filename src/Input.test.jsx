import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('할 일을 입력하면 입력값으로 변경되어야 한다', () => {
  const value = '뭐라도 하기';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByPlaceholderText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  expect(handleChange).not.toBeCalled();
  fireEvent.change(input, {
    target: {
      value: '뭐라도 하기',
    },
  });

  expect(input).toHaveAttribute('value', '뭐라도 하기');
});

test('추가버튼이 눌러진다', () => {
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
});

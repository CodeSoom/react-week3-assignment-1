import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('할 일을 입력할 수 있다', () => {
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

  fireEvent.change(input, {
    target: {
      value: '뭐라도 하기',
    },
  });

  expect(input).toHaveAttribute('value', '뭐라도 하기');
});

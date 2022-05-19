/* eslint-disable comma-dangle */
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '뭐라도 하기';

  const handleChange = jest.fn();

  const { container, getByPlaceholderText } = render(
    <Input value={value} onChange={handleChange} />
  );

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleChange).not.toBeCalled();

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, { target: { value } });

  expect(input.value).toBe(value);
});

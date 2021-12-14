import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

it('input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();
  const { container, getByText, getByRole } = render(
    <Input
      value="test"
      onClick={handleClick}
      onChange={handleChange}
    />,
  );

  // 할 일 버튼 작동
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();

  expect(getByRole('textbox').value).toBe('test');
  expect(handleChange).not.toBeCalled();
  fireEvent.change(getByRole('textbox'), { target: { value: 'test2' } });
  expect(handleChange).toBeCalledTimes(1);
  // expect(getByRole('textbox').value).toBe('test2');
});

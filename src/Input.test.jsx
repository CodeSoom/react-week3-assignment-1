import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();
  const { container, getByText, getByRole } = render(
    <Input
      value="test"
      onClick={handleClick}
      onChange={handleChange}
    />,
  );

  // 추가 버튼 작인 확인
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();

  //textbox 입력 작동 확인
  expect(getByRole('textbox').value).toBe('test');
  expect(handleChange).not.toBeCalled();
  fireEvent.change(getByRole('textbox'), { target: { value: 'test2' } });
  expect(handleChange).toBeCalledTimes(1);
  // expect(getByRole('textbox').value).toBe('test2');
});

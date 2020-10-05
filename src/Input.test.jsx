import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  render(
    <Input
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  expect(screen.getByText('할 일')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
  expect(screen.getByRole('button')).toHaveTextContent('추가');

  expect(handleChange).not.toHaveBeenCalled();

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '강의듣기' },
  });

  expect(handleChange).toHaveBeenCalledTimes(1);

  expect(handleClick).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

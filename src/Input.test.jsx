import { render, screen } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = {};

  const onClick = jest.fn();

  const { container } = render(
    <Input value={value} onClick={onClick} />,
  );

  screen.getByPlaceholderText('할 일을 입력해 주세요');
  expect(container).toHaveTextContent('추가');
});

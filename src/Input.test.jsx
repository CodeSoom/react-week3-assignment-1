import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleClick = jest.fn();

  const { container } = render((
    <Input
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const task = screen.getByLabelText('할 일');
  const button = screen.getByText('추가');

  fireEvent.change(task, { target: { value: '아무거나' } });

  expect(task.value).toBe('아무거나');

  fireEvent.click(button);

  expect(handleClick).toBeCalled();
});

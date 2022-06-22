import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('input', () => {
  const taskTitle = '안녕';

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByPlaceholderText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: taskTitle } });

  expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe(taskTitle);
});

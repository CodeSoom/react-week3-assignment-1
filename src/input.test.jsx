import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input 추가 button 클릭', () => {
  const task = {
    newId: 1,
    taskTitle: '할 일 1',
  };

  const { taskTitle } = task;

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();

  const inputField = getByPlaceholderText('할 일을 입력해 주세요');
  const letter = 'a';

  expect(handleChange).not.toBeCalled();
  fireEvent.change(inputField, { target: { value: letter } });
  expect(handleChange).toBeCalledTimes(1);
});

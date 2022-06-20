import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const taskTitle = '테스트코드 작성';

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container } = render((
    <Input
      id="input-task-title"
      type="text"
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(handleChange).not.toBeCalled();
  expect(handleChange).toBeCalledWith(taskTitle);
  fireEvent.change(Input, { target: { value: taskTitle } });
  expect(container).toHaveTextContent(taskTitle);
});

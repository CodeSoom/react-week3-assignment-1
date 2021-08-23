import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const state = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const { taskTitle } = state;

  const handleClick = jest.fn();

  const { container } = render((
    <Input
      value={taskTitle}
      onChange={handleClick}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
});

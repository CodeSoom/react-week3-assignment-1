import { render } from '@testing-library/react';

import Input from './Input';

test('Input', async () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container } = render((
    <Input
      value=""
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

it('', () => {
  const taskTitle = 'ab';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  render(
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />,
  );

  expect(onClickAddTask).not.toBeCalled();

  userEvent.click(screen.getByRole('button', { name: '추가' }));

  expect(onClickAddTask).toBeCalledTimes(1);

  const InputBox = screen.getByRole('textbox', { name: '할 일' });
  expect(InputBox).toHaveValue('ab');
  userEvent.type(InputBox, 'abcd');

  expect(onChangeTitle).toBeCalledTimes(4);
});

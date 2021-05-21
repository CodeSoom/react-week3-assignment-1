import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../components/Input';

describe('Input', () => {
  const taskTitle = '';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const renderInput = () => (
    render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ))
  );

  it('renders 추가 button and listens click event', () => {
    const { getByRole } = renderInput();

    expect(onClickAddTask).not.toBeCalled();
    userEvent.click(getByRole('button', { name: '추가' }));
    expect(onClickAddTask).toBeCalled();
  });

  it('renders input control', () => {
    const { getByRole } = renderInput();

    expect(getByRole('textbox', { name: '할 일' })).toBeInTheDocument();
  });

  context('when nothing is typed', () => {
    it("doesn't call handler", () => {
      expect(onChangeTitle).not.toBeCalled();
    });
  });

  context('when something is typed', () => {
    it('does call handler', () => {
      const value = 'abcd';
      const { getByRole } = renderInput();

      userEvent.type(getByRole('textbox'), value);
      expect(onChangeTitle).toBeCalledTimes(value.length);
    });
  });
});

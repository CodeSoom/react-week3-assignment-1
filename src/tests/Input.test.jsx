import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../components/Input';

describe('Input component', () => {
  const taskTitle = '';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  beforeEach(() => {
    render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
  });

  it('renders button on screen', () => {
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();
  });

  it('renders 추가 button and listens click event', () => {
    expect(onClickAddTask).not.toBeCalled();

    userEvent.click(screen.getByRole('button', { name: '추가' }));

    expect(onClickAddTask).toBeCalled();
  });

  it('renders inputbox on screen', () => {
    expect(screen.getByRole('textbox', { name: '할 일' })).toBeInTheDocument();
  });

  context('when nothing is typed', () => {
    it("doesn't call handler", () => {
      expect(onChangeTitle).not.toBeCalled();
    });
  });

  context('when something is typed', () => {
    it('does call handler', () => {
      userEvent.type(screen.getByRole('textbox'), 'abcd');
      expect(onChangeTitle).toBeCalledTimes(4);
    });
  });
});

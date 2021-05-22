import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  context('when value is empty', () => {
    it('renders hint message', () => {
      const taskTitle = '';
      render(
        <Input
          value={taskTitle}
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />,
      );

      // screen.debug();
      expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
      expect(
        screen.queryByPlaceholderText('할 일을 입력해 주세요'),
      ).toBeInTheDocument();
    });
  });

  context('when value is not empty', () => {
    it('renders Input text', () => {
      const taskTitle = 'TDD 익숙해지기';
      render(
        <Input
          value={taskTitle}
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />,
      );
      // screen.debug();
      // screen.getByRole('');
      const input = screen.getByRole('textbox');
      expect(input).toBeEmptyDOMElement();
      expect(input.value).toEqual(taskTitle);
    });
  });

  it('listens input change event', () => {
    const taskTitle = '';
    const typing = '!';
    render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, typing);
    expect(handleChangeTitle).toBeCalled();
  });

  it('listens click event', () => {
    const taskTitle = '할일 추가 하기';
    render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    expect(handleClickAddTask).not.toBeCalled();
    userEvent.click(screen.getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });
});

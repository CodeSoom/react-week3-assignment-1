import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const handleClickAddTask = jest.fn();

  const pageRender = (tasks, taskTitle) => render((
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onClickDeleteTask={handleClickDeleteTask}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
    />
  ));

  context('with tasks & taskTitle', () => {
    const taskTitle = '네번째 할 일';
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
      { id: 3, title: '세번째 할 일' },
    ];

    it('show taskTitle in inputbox', () => {
      const { container, getByPlaceholderText, getByText } = pageRender(tasks, taskTitle);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(input).toHaveDisplayValue('네번째 할 일');
      expect(container).toHaveTextContent('추가');

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(input, { target: { value: '입력된 문자' } });

      expect(handleChangeTitle).toBeCalled();

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });

    it('show tasks list', () => {
      const { container, getAllByRole, getAllByText } = pageRender(tasks, taskTitle);

      expect(container).toHaveTextContent('To-do');

      const taskItems = getAllByRole('listitem');
      taskItems.forEach((task, index) => {
        expect(task).toHaveTextContent(tasks[index].title);
        expect(task).toHaveTextContent('완료');
      });

      expect(handleClickDeleteTask).not.toBeCalled();

      const deleteButtons = getAllByText('완료');

      deleteButtons.forEach((deleteButton) => fireEvent.click(deleteButton));

      expect(handleClickDeleteTask).toBeCalledTimes(taskItems.length);
    });
  });

  context('without tasks & taskTitle', () => {
    const taskTitle = '';
    const tasks = [];

    it('show placeholder', () => {
      const { container, getByPlaceholderText } = pageRender(tasks, taskTitle);

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('');
      expect(container).toHaveTextContent('추가');
    });

    it('show "할 일이 없어요!"', () => {
      const { container } = pageRender(tasks, taskTitle);

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });
});

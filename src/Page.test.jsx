import React from 'react';

import { render } from '@testing-library/react';

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

  context('with tasks & taskTitle', () => {
    const taskTitle = '네번째 할 일';
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
      { id: 3, title: '세번째 할 일' },
    ];

    it('show taskTitle in inputbox', () => {
      const { container, getByPlaceholderText } = pageRender(tasks, taskTitle);

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('네번째 할 일');
      expect(container).toHaveTextContent('추가');
    });

    it('show tasks list', () => {
      const { container, getAllByRole } = pageRender(tasks, taskTitle);

      expect(container).toHaveTextContent('To-do');

      const taskItems = getAllByRole('listitem');
      taskItems.forEach((task, index) => {
        expect(task).toHaveTextContent(tasks[index].title);
        expect(task).toHaveTextContent('완료');
      });
    });
  });
});

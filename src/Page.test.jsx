import React from 'react';

import { render } from '@testing-library/react';
import context from 'jest-plugin-context';

import Page from './Page';

describe('Page', () => {
  const handleClickAddTask = jest.fn();
  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const renderPage = ({
    tasks = [],
    taskTitle = '',
  }) => render(
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('tasks가 있을 때', () => {
    const tasks = [
      { id: 1, title: '투자하기' },
      { id: 2, title: '블로그 글쓰기' },
      { id: 3, title: '연애하기' },
      { id: 4, title: '동료들과 함께하기' },
    ];

    it('task를 추가한 tasks 목록을 출력합니다.', () => {
      const addedOneTaskInTasks = [...tasks, { id: 5, title: '잠자기' }];
      const { getByText } = renderPage({ tasks: addedOneTaskInTasks });

      addedOneTaskInTasks.forEach((task) => {
        expect(getByText(task.title)).not.toBeNull();
      });
    });
  });
});

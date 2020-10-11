import React from 'react';

import { render, fireEvent, re } from '@testing-library/react';
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

    it('추가버튼 클릭 시, task를 추가한 tasks 목록을 출력합니다.', () => {
      const { getByText, rerender } = renderPage({ tasks });
      const addedOneTaskInTasks = [...tasks, { id: 5, title: '잠자기' }];

      // When
      fireEvent.click(getByText('추가'));
      rerender({ tasks: addedOneTaskInTasks });
      // Then
      addedOneTaskInTasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });

    it('모든 완료 버튼 클릭 시, 빈 메시지를 출력합니다.', () => {
      const { getByText, getAllByText, rerender } = renderPage({ tasks });

      // When
      fireEvent.click(getAllByText('완료'));
      rerender({ tasks: [] });

      // Then
      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});

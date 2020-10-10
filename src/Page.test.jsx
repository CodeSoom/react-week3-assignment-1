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

    it('컴포넌트 랜딩 시, tasks 목록을 출력합니다.', () => {
      const { getByText } = renderPage({ tasks });
      // When
      // Then
      tasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });

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

    it('제거 버튼 클릭 시, task가 제거된 tasks 목록을 출력합니다.', () => {
      const { getByText, getAllByText, rerender } = renderPage({ tasks });
      const removedOneTaskInTasks = [...tasks].filter((_, idx) => idx !== 4);

      // When
      fireEvent.click(getAllByText('제거'));
      rerender({ tasks: removedOneTaskInTasks });

      // Then
      removedOneTaskInTasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });
  });

  context('tasks가 없으면서 입력값이 없을 때', () => {
    // Given
    // const { getByTestId } = render(<Page />);
    // const input = getByTestId('input-task');
    // const inputValue = '게임하기';

    it('컴포넌트 호출 시, 빈 메시지를 출력합니다.', () => {
      // When
      // Then
    });

    it('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
      // When
      // Then
    });

    it('추가버튼 클릭 시, task를 추가한 tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });

    it('제거 버튼 클릭 시, 빈 메시지를 출력합니다.', () => {
      // When
      // Then
    });
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const renderPage = (
    taskTitle = '',
    tasks = [],
  ) => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  context('랜더링 되면', () => {
    test('Headings를 표시한다', () => {
      const { getByText } = renderPage();

      expect(getByText('To-do')).toBeInTheDocument();
    });

    test('label, 버튼, placeholder를 표시한다', () => {
      const { getByText, getByPlaceholderText } = renderPage();

      expect(getByText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('tasks가 없을 때', () => {
    test('빈 메시지를 표시한다', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 있을 때', () => {
    test('할일 목록과 완료 버튼을 표시한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
      ];

      const { getByText } = renderPage('', tasks);

      expect(getByText('운동하기')).toBeInTheDocument();
      expect(getByText('완료')).toBeInTheDocument();
    });
  });

  context('완료 버튼을 클릭하면', () => {
    test('handleClickDeleteTask()를 호출한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
      ];

      const { getByText } = renderPage('', tasks);
      expect(handleClickDeleteTask).not.toHaveBeenCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClickDeleteTask).toHaveBeenCalled();
    });
  });

  context('taskTitle을 입력되면', () => {
    test('handleChangeTitle()을 호출한다', () => {
      const { getByLabelText } = renderPage();

      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: { value: '운동하기' },
      });

      expect(handleChangeTitle).toHaveBeenCalled();
    });
  });

  context('추가 버튼을 클릭하면', () => {
    test('handleClickAddTask()를 호출한다', () => {
      const taskTitle = '운동하기';

      const { getByLabelText, getByText } = renderPage(taskTitle);
      const input = getByLabelText('할 일');

      expect(input).toHaveDisplayValue('운동하기');

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toHaveBeenCalled();
      expect(input).toHaveDisplayValue('');
    });
  });
});

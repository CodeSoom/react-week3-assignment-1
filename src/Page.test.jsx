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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('랜더링 되면', () => {
    it('To-do를 표시한다', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('To-do');
    });

    it('label, 버튼, placeholder를 표시한다', () => {
      const { getByText, getByPlaceholderText } = renderPage();

      expect(getByText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('tasks가 없을 때', () => {
    it('빈 메시지를 표시한다', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 있을 때', () => {
    it('할일 목록들을 표시한다', () => {
      const taskTitle = '';
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '산책하기' },
      ];

      const { getAllByRole } = renderPage(taskTitle, tasks);
      const taskLists = getAllByRole('listitem');

      taskLists.forEach((task, index) => {
        expect(task).toHaveTextContent(tasks[index].title);
        expect(task).toHaveTextContent('완료');
      });
    });
  });

  context('완료 버튼을 클릭하면', () => {
    it('handleClickDeleteTask()를 호출한다', () => {
      const taskTitle = '';
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '산책하기' },
      ];

      const { getAllByText } = renderPage(taskTitle, tasks);

      expect(handleClickDeleteTask).not.toHaveBeenCalled();

      const buttons = getAllByText('완료');

      buttons.forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClickDeleteTask).toHaveBeenCalledTimes(2);
    });
  });

  context('taskTitle을 입력되면', () => {
    it('handleChangeTitle()을 호출한다', () => {
      const { getByLabelText } = renderPage();

      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: { value: '운동하기' },
      });

      expect(handleChangeTitle).toHaveBeenCalled();
    });
  });

  context('추가 버튼을 클릭하면', () => {
    it('handleClickAddTask()를 호출한다', () => {
      const taskTitle = '운동하기';

      const { getByText } = renderPage(taskTitle);

      expect(handleClickAddTask).not.toHaveBeenCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toHaveBeenCalled();
    });
  });
});

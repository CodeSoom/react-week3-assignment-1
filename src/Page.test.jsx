import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPage({ taskTitle, tasks }) {
    return render((<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />));
  }

  it('To-do와 할 일을 표시한다.', () => {
    const { container } = renderPage();
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
  });

  context('task가 없을 경우', () => {
    const taskTitle = '';
    const tasks = [];

    const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

    it(' "할 일을 입력해 주세요", "할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderPage({ taskTitle, tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
    });

    it('추가버튼을 누를 경우 onClickAddTask을 실행합니다.', () => {
      expect(onClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(onClickAddTask).toBeCalled();
    });
  });

  context('task가 있을 경우', () => {
    const taskTitle = '산책하기';
    const tasks = [
      { id: 1, title: '공부하기' },
      { id: 2, title: '밥먹기' },
    ];
    const {
      container, getAllByText,
      getByPlaceholderText, getByText,
    } = renderPage({ taskTitle, tasks });

    it('입력된 값과 할 일들을 보여준다.', () => {
      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });

      expect(container).toHaveTextContent('완료');
      getAllByText('완료').forEach((button) => {
        expect(onClickDeleteTask).not.toBeCalled();
        fireEvent.click(button);
        expect(onClickDeleteTask).toBeCalled();
      });
    });

    it('추가버튼을 누를 경우 onClickAddTask을 실행합니다.', () => {
      expect(onClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(onClickAddTask).toBeCalled();
    });
  });
});

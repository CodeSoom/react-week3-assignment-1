import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const onChangeTitle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPage({ taskTitle, tasks }) {
    return render((<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
      onChangeTitle={onChangeTitle}
    />));
  }

  it('To-do와 할 일을 표시한다.', () => {
    const { container } = renderPage({ taskTitle: '', tasks: [] });

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  context('task가 없을 경우', () => {
    const taskTitle = '';
    const tasks = [];

    it(' "할 일을 입력해 주세요", "할 일이 없어요!"를 표시한다.', () => {
      const { container, getByPlaceholderText } = renderPage({ taskTitle, tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
    });

    it('추가버튼을 누를 경우 onClickAddTask을 실행한다.', () => {
      const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

      expect(onClickAddTask).not.toBeCalled();
      fireEvent.click(getByText(/추가/));
      expect(onClickAddTask).toBeCalled();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
    });

    it('입력이 변경되면 onChangeTitle을 실행한다.', () => {
      const { getByPlaceholderText } = renderPage({ taskTitle: undefined, tasks });

      expect(onChangeTitle).not.toBeCalled();
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: 'TDD 과제하기' },
      });
      expect(onChangeTitle).toBeCalled();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('TDD 과제하기');
    });
  });

  context('task가 있을 경우', () => {
    const taskTitle = '산책하기';
    const tasks = [
      { id: 1, title: '공부하기' },
      { id: 2, title: '밥먹기' },
    ];

    it('입력된 값과 할 일들을 보여준다.', () => {
      const { container, getByPlaceholderText } = renderPage({ taskTitle, tasks });

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
      expect(container).toHaveTextContent('완료');
    });

    it('완료버튼을 누를 경우 onClickDelete 함수 실행한다.', () => {
      const { getAllByText } = renderPage({ taskTitle, tasks });

      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
        expect(onClickDeleteTask).toBeCalled();
      });
    });

    it('추가버튼을 누를 경우 onClickAddTask을 실행합니다.', () => {
      const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

      expect(onClickAddTask).not.toBeCalled();
      fireEvent.click(getByText(/추가/));
      expect(onClickAddTask).toBeCalled();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
    });

    it('입력이 변경되면 onChangeTitle을 실행한다.', () => {
      const { getByPlaceholderText } = renderPage({ taskTitle, tasks });

      expect(onChangeTitle).not.toBeCalled();
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: 'TDD 과제하기' },
      });
      expect(onChangeTitle).toBeCalled();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('TDD 과제하기');
    });
  });
});

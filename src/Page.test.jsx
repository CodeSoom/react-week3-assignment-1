import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page에서', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  function renderPageWith(
    taskTitle,
    tasks,
  ) {
    return render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        onClickDeleteTask={onClickDeleteTask}
      />
    ));
  }

  context('tasks가 있을 때', () => {
    const tasks = [
      { id: 1, title: '볶음밥 만들기' },
      { id: 2, title: '누워있기' },
      { id: 3, title: '계속 누워있기' },
    ];
    const taskTitle = '밥먹기';

    it('인풋과 할 일 목록을 모두 보여준다.', () => {
      const { getByText, getAllByText, getByPlaceholderText } = renderPageWith(taskTitle, tasks);

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
      expect(getByText('추가')).toBeInTheDocument();
      tasks.forEach((todo) => {
        expect(getByText(todo.title)).toBeInTheDocument();
      });
      getAllByText('완료').forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    it('추가버튼을 누르면 onClickAddTesk 함수가 실행된다.', () => {
      const { getByText } = renderPageWith(taskTitle, tasks);

      expect(onClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(onClickAddTask).toBeCalled();
    });

    it('완료버튼을 누르면 onClickDeleteTask 함수가 실행된다.', () => {
      const { getAllByText } = renderPageWith(taskTitle, tasks);

      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
        expect(onClickDeleteTask).toBeCalled();
      });
    });
  });

  context('tasks가 없을 때', () => {
    const tasks = [];
    const taskTitle = '밥먹기';

    it('인풋과 할 일이 없다는 것을 보여준다.', () => {
      const { container, getByPlaceholderText, getByText } = renderPageWith(taskTitle, tasks);

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
      expect(getByText('추가')).toBeInTheDocument();
      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('추가버튼을 누르면 onClickAddTesk 함수가 실행된다.', () => {
      const { getByText } = renderPageWith(taskTitle, tasks);

      expect(onClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(onClickAddTask).toBeCalled();
    });
  });
});

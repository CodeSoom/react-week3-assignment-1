import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  function renderPage({ taskTitle, tasks }) {
    return render((<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />));
  }

  const { mainContainer } = render((
    <Page />
  ));
  expect(mainContainer).toHaveTextContent('To-do');
  expect(mainContainer).toHaveTextContent('할 일');
  expect(mainContainer).toHaveTextContent('추가');

  context('task가 없을 경우', () => {
    const taskTitle = '';
    const tasks = [];

    const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

    it(' "할 일을 입력해 주세요", "할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderPage({ taskTitle, tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBe('할 일을 입력해 주세요');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toValue('');
    });

    expect(onClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(onClickAddTask).toBeCalled();
  });

  context('task가 있을 경우', () => {
    const taskTitle = '산책하기';
    const tasks = [
      { id: 1, title: '공부하기' },
    ];

    it('입력된 값과 할 일들을 보여준다.', () => {
      const { container, getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBe('할 일을 입력해 주세요');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toValue(taskTitle);

      expect(getByText(tasks.title)).toValue('공부하기');

      expect(container).toHaveTextContent('완료');
      expect(onClickDeleteTask).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(onClickDeleteTask).toBeCalled();
    });
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  function renderPage(taskTitle, tasks) {
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

  const taskTitle = '스트레칭 하기';

  const tasks = [
    { id: 1, title: '아무것도 안하기1' },
    { id: 2, title: '아무것도 안하기2' },
    { id: 3, title: '아무것도 안하기3' },
  ];

  it('renders title', () => {
    const { container } = renderPage(taskTitle, tasks);

    expect(container).toHaveTextContent('To-do');
  });

  it('renders taskTitle', () => {
    const { queryByLabelText } = renderPage(taskTitle, tasks);

    expect(queryByLabelText('할 일')).toHaveDisplayValue('스트레칭 하기');
  });

  it('render tasks', () => {
    const { container } = renderPage(taskTitle, tasks);

    tasks.forEach(({ title }) => {
      expect(container).toHaveTextContent(title);
    });
  });

  it('listen click event', () => {
    const { getAllByText } = renderPage(taskTitle, tasks);

    fireEvent.click(getAllByText('완료')[0]);

    expect(onClickDeleteTask).toBeCalled();
  });
});

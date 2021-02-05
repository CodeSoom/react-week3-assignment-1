import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChageTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const taskTitle = '홈트 하기';
  const tasks = [
    { id: 1, title: '삼겹살 먹기' },
    { id: 2, title: '코딩하기' },
  ];

  const rederPage = () => render((
    <Page
      taskTitle={taskTitle}
      handleChageTitle={handleChageTitle}
      handleClickAddTask={handleClickAddTask}
      tasks={tasks}
      handleClickDeleteTask={handleClickDeleteTask}
    />
  ));

  it('renders title', () => {
    const { container } = rederPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('renders task title', () => {
    const { getByDisplayValue } = rederPage();
    expect(getByDisplayValue(taskTitle)).toBeInTheDocument();
  });

  it('renders tasks', () => {
    const { container } = rederPage();

    expect(container).toHaveTextContent(tasks[0].title);
    expect(container).toHaveTextContent(tasks[1].title);
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const renderPage = (taskTitle = '', tasks = '') => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  it('Page Title에 "To-do"가 출력되는 지 확인', () => {
    const { getByText } = renderPage();
    expect(getByText('To-do')).toHaveTextContent('To-do');
  });
})
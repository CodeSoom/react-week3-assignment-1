import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Component', () => {
  const headingText = 'To-do';
  const labelText = '할 일';
  const addButtonText = '추가';
  const listDefaultText = '할 일이 없어요!';

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const renderPage = (taskTitle = '', tasks = []) => render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('without tasks, taskTitle', () => {
    const tasks = [];
    const taskTitle = '';
    it('shows elements correctly', () => {
      const { getByText, getByLabelText } = renderPage(taskTitle, tasks);

      expect(getByText(headingText)).toBeInTheDocument();
      expect(getByText(labelText)).toBeInTheDocument();
      expect(getByLabelText(labelText)).toBeInTheDocument();
      expect(getByText(addButtonText)).toBeInTheDocument();
      expect(getByText(listDefaultText)).toBeInTheDocument();
    });
  });
});

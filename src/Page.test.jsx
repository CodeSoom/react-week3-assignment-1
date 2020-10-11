import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const taskTitle = '할 일을 입력해 주세요';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const tasks = [];
  const onClickDeleteTask = jest.fn();

  context('when it renders', () => {
    it('renders a heading', () => {
      const { container } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={onChangeTitle}
          onClickAddTask={onClickAddTask}
          tasks={tasks}
          onClickDeleteTask={onClickDeleteTask}
        />
      ));

      expect(container).toContainHTML('<h1>To-do</h1>');
    });
  });
});

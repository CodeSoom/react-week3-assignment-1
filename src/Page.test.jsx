import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const taskTitle = '';
  const tasks = [];

  context('when rendering', () => {
    it('To-do', () => {
      const { container } = render((<Page tasks={tasks} />));

      expect(container).toHaveTextContent('To-do');
    });

    it('deliver props to Input', () => {
      render((
        <Page
          tasks={tasks}
          taskTitle={taskTitle}
          onChangeTitle={onChangeTitle}
          onClickAddTask={onClickAddTask}
        />
      ));
    });

    it('deliver props to List', () => {
      render((
        <Page
          tasks={tasks}
          onClickDeleteTask={onClickDeleteTask}
        />
      ));
    });
  });
});

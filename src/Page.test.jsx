import { render } from '@testing-library/react';

import Page from './Page';

describe('Page component', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const setup = ({ taskTitle = '', tasks = [] }) => render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  context('When tasks is empty', () => {});

  context('When tasks exist', () => {});
});

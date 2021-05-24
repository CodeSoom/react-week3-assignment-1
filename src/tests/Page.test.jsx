import { render } from '@testing-library/react';

import Page from '../pages/TodoPage';

describe('Page', () => {
  const taskTitle = '';
  const tasks = [{ id: 1 }];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleDeleteTask = jest.fn();

  const renderPage = () => (
    render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleDeleteTask}
      />
    )));

  it('renders header', () => {
    const { getByText } = renderPage();
    expect(getByText('To-do')).toBeInTheDocument();
  });

  it('renders input control for adding new task', () => {
    const { getByRole } = renderPage();
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('renders list of task', () => {
    const { getByRole } = renderPage();
    expect(getByRole('list')).toBeInTheDocument();
  });
});

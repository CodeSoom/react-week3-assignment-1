import { render } from '@testing-library/react';

import Page from '../pages/TodoPage';

describe('Page', () => {
  const renderPage = () => (
    render((
      <Page
        taskTitle=""
        tasks={[{ id: 1 }]}
        onChangeTitle={jest.fn()}
        onClickAddTask={jest.fn()}
        onClickDeleteTask={jest.fn()}
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

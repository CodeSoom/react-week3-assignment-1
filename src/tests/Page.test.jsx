import { render } from '@testing-library/react';

import Page from '../pages/TodoPage';

describe('Page component', () => {
  given('container', () => (
    render((
      <Page
        taskTitle=""
        tasks={[{ id: 1 }]}
        onChangeTitle={jest.fn()}
        onClickAddTask={jest.fn()}
        onClickDeleteTask={jest.fn()}
      />
    ))
  ));

  it('renders header', () => {
    const { getByText } = given.container;
    expect(getByText('To-do')).toBeInTheDocument();
  });

  it('renders input control for adding new task', () => {
    const { getByRole } = given.container;
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('renders list of task', () => {
    const { getByRole } = given.container;
    expect(getByRole('list')).toBeInTheDocument();
  });
});

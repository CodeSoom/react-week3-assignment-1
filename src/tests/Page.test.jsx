import { render, screen } from '@testing-library/react';

import Page from '../pages/TodoPage';

describe('Page component', () => {
  beforeEach(() => {
    render((
      <Page
        taskTitle=""
        tasks={[{ id: 1 }]}
        onChangeTitle={jest.fn()}
        onClickAddTask={jest.fn()}
        onClickDeleteTask={jest.fn()}
      />
    ));
  });

  it('renders header', () => {
    expect(screen.getByText('To-do')).toBeInTheDocument();
  });
  it('renders Input Component', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('renders List component', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

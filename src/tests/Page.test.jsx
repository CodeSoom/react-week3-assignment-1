import { render, screen } from '@testing-library/react';

import Page from '../pages/TodoPage';

describe('Test Page component', () => {
  beforeEach(() => {
    render(
      <Page
        taskTitle=""
        tasks={[{ id: 1 }]}
        onChangeTitle={() => null}
        onClickAddTask={() => null}
        onClickDeleteTask={() => null}
      />,
    );
  });

  it('header renders', () => {
    expect(screen.getByText('To-do')).toBeInTheDocument();
  });
  it('Input component renders', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('List component renders', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

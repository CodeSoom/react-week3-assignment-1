import { fireEvent, render, screen } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '뭐라도 하기 2',
    },
  ];
  const emptyTasks = [];

  it('renders text when tasks does not exist', () => {
    render(<List tasks={emptyTasks} />);

    screen.getByText(/할 일이 없어요!/);
  });

  it('renders tasks', () => {
    render(<List tasks={tasks} />);

    screen.getByText(tasks[0].title);
    screen.getByText(tasks[1].title);
  });

  it('calls onClickDelete', () => {
    const onClickDelete = jest.fn();

    render(<List tasks={tasks} onClickDelete={onClickDelete} />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onClickDelete).toBeCalledWith(tasks[0].id);
  });
});

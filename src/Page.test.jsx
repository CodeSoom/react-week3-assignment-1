import {
  fireEvent, render, screen,
} from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const emptyTasks = [];
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
  it('renders title, Input, List', () => {
    render(<Page tasks={emptyTasks} />);

    screen.getByRole('heading', { name: /To-do/i });

    screen.getByRole('textbox', { name: /할 일/ });
    screen.getByRole('button', { name: /추가/ });

    screen.getByText(/할 일이 없어요!/);
  });

  it('renders tasks', () => {
    render(<Page tasks={tasks} />);

    screen.getByText(tasks[0].title);
    screen.getByText(tasks[1].title);
  });

  it('renders taskTitle', () => {
    const taskTitle = '뭐라도 하기';

    render(<Page value={taskTitle} tasks={emptyTasks} />);

    // expect(screen.getByRole('textbox', { name: /할 일/ })).toHaveAttribute('value', '뭐라도 하기');
  });

  it('calls onChangeTitle', () => {});

  it('calls onClickAddTask', () => {});

  it('calls onClickDeleteTask', () => {});
});

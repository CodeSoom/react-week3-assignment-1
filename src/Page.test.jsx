import {
  fireEvent,
  render, screen,
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
  it('renders title, Input, List when doesn\'t exist tasks', () => {
    render(<Page tasks={emptyTasks} />);

    screen.getByRole('heading', { name: /To-do/i });

    screen.getByLabelText('할 일');
    screen.getByRole('button', { name: '추가' });

    screen.getByText('할 일이 없어요!');
  });

  it('renders title, Input, List when exist tasks', () => {
    render(<Page tasks={tasks} />);

    screen.getByRole('heading', { name: /To-do/i });

    screen.getByLabelText('할 일');
    screen.getByRole('button', { name: '추가' });

    screen.getByText(tasks[0].title);
    screen.getByText(tasks[1].title);
    screen.getAllByRole('button', { name: '완료' });
  });

  it('calls onChangeTitle', () => {
    const onChangeTitle = jest.fn();

    render(<Page onChangeTitle={onChangeTitle} tasks={emptyTasks} />);

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });

    expect(onChangeTitle).toBeCalled();
  });

  it('calls onClickAddTask', () => {
    const onClickAddTask = jest.fn();

    render(<Page onClickAddTask={onClickAddTask} tasks={emptyTasks} />);

    fireEvent.click(screen.getByRole('button', { name: '추가' }));

    expect(onClickAddTask).toBeCalled();
  });

  it('calls onClickDeleteTask', () => {
    const onClickDeleteTask = jest.fn();

    render(<Page onClickDeleteTask={onClickDeleteTask} tasks={tasks} />);

    fireEvent.click(screen.getAllByRole('button', { name: '완료' })[0]);

    expect(onClickDeleteTask).toBeCalled();
  });
});

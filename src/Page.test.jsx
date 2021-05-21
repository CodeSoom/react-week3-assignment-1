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

  function setup(props = {}) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<Page {...props} />);
    const heading = screen.getByRole('heading', { name: /To-do/i });
    const button = screen.getByRole('button', { name: '추가' });
    const input = screen.getByLabelText('할 일');

    return {
      heading,
      button,
      input,
    };
  }

  it('renders title, Input, List when doesn\'t exist tasks', () => {
    const {
      heading,
      input,
      button,
    } = setup({ tasks: emptyTasks });

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
  });

  it('renders title, Input, List when exist tasks', () => {
    const {
      heading,
      input,
      button,
    } = setup({ tasks });

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(screen.getByText(tasks[0].title)).toBeInTheDocument();
    expect(screen.getByText(tasks[1].title)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '완료' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '완료' })[1]).toBeInTheDocument();
  });

  it('calls onChangeTitle', () => {
    const onChangeTitle = jest.fn();

    const { input } = setup({ onChangeTitle, tasks: emptyTasks });

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(onChangeTitle).toBeCalled();
  });

  it('calls onClickAddTask', () => {
    const onClickAddTask = jest.fn();

    const { button } = setup({ onClickAddTask, tasks: emptyTasks });

    fireEvent.click(button);

    expect(onClickAddTask).toBeCalled();
  });

  it('calls onClickDeleteTask', () => {
    const onClickDeleteTask = jest.fn();

    setup({ onClickDeleteTask, tasks });

    fireEvent.click(screen.getAllByRole('button', { name: '완료' })[0]);

    expect(onClickDeleteTask).toBeCalled();
  });
});

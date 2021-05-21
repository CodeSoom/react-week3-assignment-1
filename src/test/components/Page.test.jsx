import {
  fireEvent,
  render, screen,
} from '@testing-library/react';

import Page from '../../components/Page';

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

  function setup(props = {
    taskTitle: undefined,
    onChangeTitle: undefined,
    onClickAddTask: undefined,
    tasks: undefined,
    onClickDeleteTask: undefined,
  }) {
    const {
      taskTitle, onChangeTitle, onClickAddTask,
      tasks: todos, onClickDeleteTask,
    } = props;

    // eslint-disable-next-line react/jsx-props-no-spreading
    render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={todos}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
    const heading = screen.getByRole('heading', { name: /To-do/i });
    const button = screen.getByRole('button', { name: '추가' });
    const input = screen.getByLabelText('할 일');

    return {
      heading,
      button,
      input,
    };
  }

  context('when doesn\'t exist tasks', () => {
    it('renders title, Input, List', () => {
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
  });

  context('when exist tasks', () => {
    it('renders title, Input, List', () => {
      const {
        heading,
        input,
        button,
      } = setup({ tasks });

      expect(heading).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      tasks.forEach((task, index) => {
        expect(screen.getByText(task.title)).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: '완료' })[index]).toBeInTheDocument();
      });
    });

    it('renders taskTitle', () => {
      const onChangeTitle = jest.fn();

      const { input } = setup({
        tasks,
        taskTitle: '뭐라도 하기',
        onChangeTitle,
      });

      expect(input).toHaveAttribute('value', '뭐라도 하기');
    });

    it('calls onClickDeleteTask', () => {
      const onClickDeleteTask = jest.fn();

      setup({ onClickDeleteTask, tasks });

      tasks.forEach((_, index) => {
        fireEvent.click(screen.getAllByRole('button', { name: '완료' })[index]);

        expect(onClickDeleteTask).toBeCalled();
      });
    });
  });

  it('calls onChangeTitle', () => {
    const onChangeTitle = jest.fn();

    const { input } = setup({ onChangeTitle, tasks });

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(onChangeTitle).toBeCalled();
  });

  it('calls onClickAddTask', () => {
    const onClickAddTask = jest.fn();

    const { button } = setup({ onClickAddTask, tasks });

    fireEvent.click(button);

    expect(onClickAddTask).toBeCalled();
  });
});

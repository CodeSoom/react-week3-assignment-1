import { fireEvent, render, screen } from '@testing-library/react';

import List from '../../components/List';

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

  function setup(props = {
    tasks: undefined,
    onClickDelete: undefined,
  }) {
    const { tasks: todos, onClickDelete } = props;

    render(<List
      tasks={todos}
      onClickDelete={onClickDelete}
    />);
  }

  context('when tasks doesn\'t exist', () => {
    it('renders "할 일이 없어요!"', () => {
      setup({ tasks: emptyTasks });

      screen.getByText('할 일이 없어요!');
    });
  });

  context('when tasks exist', () => {
    it('renders tasks', () => {
      setup({ tasks });

      tasks.forEach((task) => expect(screen.getByText(task.title)).toBeInTheDocument());
    });

    it('calls onClickDelete', () => {
      const onClickDelete = jest.fn();

      setup({ tasks, onClickDelete });

      tasks.forEach((_, index) => {
        fireEvent.click(screen.getAllByRole('button')[index]);

        expect(onClickDelete).toBeCalledWith(tasks[index].id);
      });
    });
  });
});

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

  const onClickDelete = jest.fn();

  function setup(todos) {
    render(
      <List
        tasks={todos}
        onClickDelete={onClickDelete}
      />,
    );
  }

  context('when tasks doesn\'t exist', () => {
    it('renders "할 일이 없어요!"', () => {
      setup(emptyTasks);

      expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when tasks exist', () => {
    it('renders tasks', () => {
      setup(tasks);

      tasks.forEach((task) => expect(screen.getByText(task.title)).toBeInTheDocument());
    });

    it('calls onClickDelete', () => {
      setup(tasks);

      tasks.forEach((_, index) => {
        fireEvent.click(screen.getAllByRole('button')[index]);

        expect(onClickDelete).toBeCalledWith(tasks[index].id);
      });
    });
  });
});

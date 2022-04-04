import { render, fireEvent } from '@testing-library/react';
import List from './List';

const emptyTasks = {
  tasks: [],
};

const filledTasks = {
  tasks: [
    { id: 100, title: '할 일 #1' },
    { id: 101, title: '할 일 #1' },
  ],
};

const setup = (state) => {
  const { tasks } = state;

  const onClickDeleteTask = jest.fn();
  const container = render(<List tasks={tasks} onClickDelete={onClickDeleteTask} />);

  return {
    ...container, tasks, onClickDeleteTask,
  };
};

test('tasks가 비어있다면, "할 일이 없어요!" 라는 메시지가 보여야 한다.', () => {
  const { container } = setup(emptyTasks);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('tasks 에 요소가 있다면 title 이 그려지고 완료 버튼이 동작해야 한다.', () => {
  const { container, getAllByText, onClickDeleteTask } = setup(filledTasks);

  filledTasks.tasks.forEach((task) => {
    expect(container).toHaveTextContent(task.title);
    expect(container).toHaveTextContent('완료');
  });

  fireEvent.click(getAllByText('완료')[0]);
  expect(onClickDeleteTask).toBeCalledWith(100);
});

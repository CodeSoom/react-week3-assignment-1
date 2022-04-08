import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import Page from './Page';

function TestPage({
  onChangeTitle,
  onClickAddTask,
  tasks,
}) {
  const [taskTitle] = useState('');

  const [stateTasks, setStateTasks] = useState(tasks);

  const handleClickDelete = (id) => {
    setStateTasks(stateTasks.filter((item) => item.id !== id));
  };

  return (
    <Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={stateTasks}
      onClickDeleteTask={handleClickDelete}
    />
  );
}

const setup = () => {
  const tasks = [
    {
      id: 1,
      title: '배고파요',
    },
    {
      id: 2,
      title: '치킨을 먹어요',
    },
    {
      id: 3,
      title: '피자를 먹어요',
    },
  ];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const utils = render(<TestPage
    tasks={tasks}
    onChangeTitle={handleChangeTitle}
    onClickAddTask={handleClickAddTask}
  />);
  return {
    tasks,
    ...utils,
  };
};

describe('Page', () => {
  const tasks = [
    {
      id: 1,
      title: '배고파요',
    },
    {
      id: 2,
      title: '치킨을 먹어요',
    },
    {
      id: 3,
      title: '피자를 먹어요',
    },
  ];
  const taskTitle = 'hello';

  it('1. 할일 리스트 출력', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();
    const { container } = render(<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />);
    expect(container).toHaveTextContent('배고파요');
    expect(container).toHaveTextContent('치킨을 먹어요');
    expect(container).toHaveTextContent('피자를 먹어요');
  });

  it("2. '완료' 버튼 출력", () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();
    const { container } = render(<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />);
    expect(container).toHaveTextContent('완료');
  });

  it('3. To-do 출력', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();
    const { container } = render(<Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />);
    expect(container).toHaveTextContent('To-do');
  });

  it("4. '완료' 버튼 클릭 (배고파요 삭제, 피자를 먹어요 삭제)", () => {
    const { container, getAllByText } = setup();

    expect(container).toHaveTextContent('배고파요');
    fireEvent.click(getAllByText('완료')[0]);
    expect(container).not.toHaveTextContent('배고파요');

    expect(container).toHaveTextContent('피자를 먹어요');
    fireEvent.click(getAllByText('완료')[1]);
    expect(container).not.toHaveTextContent('피자를 먹어요');

    expect(container).toHaveTextContent('치킨을 먹어요');
  });

  it("5. 빈 배열일 때 '할 일이 없어요!' 출력", () => {
    const { container, getAllByText } = setup();

    fireEvent.click(getAllByText('완료')[0]);
    fireEvent.click(getAllByText('완료')[0]);
    fireEvent.click(getAllByText('완료')[0]);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

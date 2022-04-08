import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import List from './List';

function TestList({ tasks }) {
  const [stateTasks, setStateTasks] = useState(tasks);

  const handleClickDelete = (id) => {
    setStateTasks(stateTasks.filter((item) => item.id !== id));
  };

  return (
    <List
      tasks={stateTasks}
      onClickDelete={handleClickDelete}
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

  const utils = render(<TestList tasks={tasks} />);
  return {
    tasks,
    ...utils,
  };
};

describe('List', () => {
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

  it('1. 할일 리스트 출력', () => {
    const handleClickDelete = jest.fn();
    const { container } = render(<List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />);
    expect(container).toHaveTextContent('배고파요');
    expect(container).toHaveTextContent('치킨을 먹어요');
    expect(container).toHaveTextContent('피자를 먹어요');
  });

  test("2. '완료' 버튼 출력", () => {
    const handleClickDelete = jest.fn();
    const { container } = render(<List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />);
    expect(container).toHaveTextContent('완료');
  });

  test("3. '완료' 버튼 클릭 (배고파요 삭제, 피자를 먹어요 삭제)", () => {
    const handleClickDelete = jest.fn();
    const { container, getAllByText } = render(<List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />);
    expect(container).toHaveTextContent('완료');

    fireEvent.click(getAllByText('완료')[0]);
    expect(handleClickDelete).toBeCalledWith(1);

    fireEvent.click(getAllByText('완료')[1]);
    expect(handleClickDelete).toBeCalledWith(2);

    fireEvent.click(getAllByText('완료')[2]);
    expect(handleClickDelete).toBeCalledWith(3);
  });

  test("4. 빈 배열일 때 '할 일이 없어요!' 출력", () => {
    const { container, getAllByText } = setup();

    fireEvent.click(getAllByText('완료')[0]);
    fireEvent.click(getAllByText('완료')[0]);
    fireEvent.click(getAllByText('완료')[0]);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

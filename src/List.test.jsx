import { fireEvent, render } from '@testing-library/react';
import List from './List';

const emptyTasks = [];
const tasks = [
  { id: 100, title: '숨 쉬기' },
  { id: 101, title: '물 마시기' },
];

test('task의 length가 0일 때 \'할 일이 없어요!\' 출력', () => {
  const { container } = render(<List tasks={emptyTasks} />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('task의 length가 1이상 일 때 해당 Item 컴포넌트 출력력인', () => {
  const handleDelete = jest.fn();
  const { container, getAllByText } = render(
    <List
      tasks={tasks}
      onClickDelete={handleDelete}
    />,
  );

  // Item 안에있는 title 확인
  expect(container).toHaveTextContent(tasks[0].title);
  expect(container).toHaveTextContent(tasks[1].title);

  // Itme 안에있는 완료버튼 존재 확인
  expect(getAllByText('완료')[0]).toContainHTML('button');
  expect(getAllByText('완료')[1]).toContainHTML('button');
});

test('onClickDelete 함수가 작동 확인', () => {
  const handleClick = jest.fn();

  const { getAllByText } = render(
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />,
  );

  fireEvent.click(getAllByText('완료')[0]);
  expect(handleClick).toHaveBeenCalledTimes(1);

  fireEvent.click(getAllByText('완료')[1]);
  expect(handleClick).toHaveBeenCalledTimes(2);
});

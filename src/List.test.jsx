import { render } from '@testing-library/react';
import List from './List';

test('task의 length가 0일 때 \'할 일이 없어요!\'', () => {
  const tasks = [];
  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('task의 length가 1이상 일 때 해당 Item 컴포넌트 출력확인', () => {
  const tasks = [
    { id: 100, title: '숨 쉬기' },
    { id: 101, title: '물 마시기' },
  ];
  const handleDelete = jest.fn();
  const { container } = render(<List
    tasks={tasks}
    onClickDelete={handleDelete}
  />);

  // Item 안에있는 title 확인
  expect(container).toHaveTextContent('숨 쉬기');
  expect(container).toHaveTextContent('물 마시기');

  // Itme 안에있는 완료버튼 존재 확인
  expect(container).toHaveTextContent('완료');
  expect(container).toContainHTML('button');
});
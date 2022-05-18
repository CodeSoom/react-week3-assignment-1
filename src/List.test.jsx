import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';

test('항목이 없을 때 할 일이 없어요! 문구가 보인다.', () => {
  const { container } = render(
    <List tasks={[]} />,
  );
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('task가 있을 때 목록이 표시된다.', () => {
  const tasks = [
    { id: 1, title: '헬스장 가기' },
    { id: 2, title: '과제 하기' },
  ];
  const { container } = render(
    <List tasks={tasks} />,
  );
});

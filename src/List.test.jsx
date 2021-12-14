import { render } from '@testing-library/react';

import List from './List';

test('tasks가 0개일 때, 문구 확인', () => {
  const tasks = [];
  const { container } = render(
    <List tasks={tasks} onClickDelete={jest.fn()} />,
  );

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('tasks가 1개이상일 떄, 렌더링 확인', () => {
  const tasks = [
    { id: 1, title: '기상' },
    { id: 2, title: '출근' },
  ];
  const { container } = render(
    <List tasks={tasks} onClickDelete={jest.fn()} />,
  );

  expect(container).toHaveTextContent('기상');
  expect(container).toHaveTextContent('출근');
});

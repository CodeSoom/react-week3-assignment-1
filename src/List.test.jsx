import { render } from '@testing-library/react';

import List from './List';

it('when tasks are given -> show title of tasks', () => {
  const tasks = [
    { id: 100, title: '운동가기' },
  ];

  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('운동가기');
  expect(container).toHaveTextContent('완료');
});

it('when tasks are empty -> show specific content', () => {
  const tasks = [];

  const { container } = render(<List
    tasks={tasks}
  />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

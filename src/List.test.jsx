import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    {
      title: '아무것도 안하기',
      id: 100,
    },
  ];
  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('아무것도 안하기');
  expect(container).toHaveTextContent('완료');
});

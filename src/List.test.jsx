import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '뭐라도 안하기',
    },
  ];
  const noneTasks = [];

  const beList = render(<List tasks={tasks} />);

  expect(beList.container).toHaveTextContent('뭐라도 하기');
  expect(beList.container).toHaveTextContent('뭐라도 안하기');

  const noneList = render(<List tasks={noneTasks} />);

  expect(noneList.container).toHaveTextContent('할 일이 없어요!');
});

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  test('tasks가 있을 때 해당 tasks에 있는 title이 나옵니다.', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '숨쉬기',
    },
    ];

    const { container } = render((
      <List tasks={tasks} />
    ));

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('숨쉬기');
  });

  test('tasks가 없을 때 "할 일이 없어요!"가 나옵니다', () => {
    const tasks = [];

    const { container } = render((
      <List tasks={tasks} />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

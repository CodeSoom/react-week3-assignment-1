import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [
    {
      newId: 1,
      taskTitle: '할 일 1',
    },
    {
      newId: 1,
      taskTitle: '할 일 1',
    },
    {
      newId: 1,
      taskTitle: '할 일 1',
    },
  ];

  const handleClick = jest.fn();

  it('renders items', () => {
    const { container } = render(
      (
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ),
    );

    // tasks 배열의 원소 수와 render되는 아이템 수가 같은지 테스트 해야한다.
    // ...
  });
});

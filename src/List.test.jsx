import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('render empty message with empty tasks', () => {
    const emptyTasks = [];

    const { container } = render((
      <List
        tasks={emptyTasks}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('render task list with valid task list', () => {
    const tasks = [
      {
        id: 101,
        title: '테스팅 공부하기',
      },
      {
        id: 102,
        title: '코드숨 과제 하기',
      },
    ];

    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent('테스팅 공부하기');
    expect(container).toHaveTextContent('코드숨 과제 하기');
  })
})


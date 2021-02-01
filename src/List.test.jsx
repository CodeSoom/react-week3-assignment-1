import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };
  const tasks = [task];

  function NoEmptyCase(container) {
    expect(container).toHaveTextContent('뭐라도 하기');
  }

  const { container } = render((
    <List
      key={task.id}
      tasks={tasks}
      tasksLen={tasks.length}
      task={task}
    />
  ));

  const containerTasksLen = container.tasksLen;

  if (containerTasksLen !== 0) {
    NoEmptyCase(container);
  }
});

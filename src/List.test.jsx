import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

// eslint-disable-next-line consistent-return
test('List', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '아무것도 하지 않기',
    },
  ];

  const { container } = render((
    <List tasks={tasks} />
  ));

  if (tasks.length === 0) {
    return (
      expect(container).toHaveTextContent('할 일이 없어요!')
    );
  }

  tasks.forEach((task) => (
    expect(container).toHaveTextContent(task.title)
  ));
});

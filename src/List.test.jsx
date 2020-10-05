import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  test('length is 0', () => {
    const tasks = [];

    const { container } = render((
      <List tasks={tasks} onClickDelete={handleClick} />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('length is over 1', () => {
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
      {
        id: 2,
        title: '할일2',
      },
    ];

    const { container } = render((
      <List tasks={tasks} onClickDelete={handleClick} />
    ));

    expect(container).toHaveTextContent('할일1');
    expect(container).toHaveTextContent('할일2');
  });
});

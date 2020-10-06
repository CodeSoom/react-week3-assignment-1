import React from 'react';

import { render } from '@testing-library/react';

import List from '../src/List';

test('List', () => {
  const tasks = [{
    id: 1,
    title: '쉬기',
  }];

  const handleClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  if (tasks.length === 0) {
    expect(container).toContainHTML('할 일이 없어요!');
  }

  expect(container).toContainHTML('<ol');
});

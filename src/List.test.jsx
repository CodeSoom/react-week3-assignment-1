import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('Task가 없을 경우', () => {
  const tasks = [];
  const noTask = '할 일이 없어요!';
  const { getByText } = render(<List tasks={tasks} />);
  expect(getByText(noTask)).toBeTruthy();
});

test('Task가 있을 경우', () => {
  const tasks = [{ id: 1, title: 'React' }, { id: 2, title: 'Javascript' }, { id: 3, title: 'Html' }];
  const { container, getByText } = render(<List tasks={tasks} />);
  expect(getByText(tasks[0].title)).toBeTruthy();
  expect(container).not.toHaveTextContent('css');
});

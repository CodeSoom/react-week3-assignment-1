import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [];
  const onClickDelete = () => {};
  const { container } = render(<List tasks={tasks} onClickDelete={onClickDelete} />);
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List', () => {
  const tasks = [{ id: 1, title: '일하기' }];
  const onClickDelete = () => {};
  const { container } = render(<List tasks={tasks} onClickDelete={onClickDelete} />);
  expect(container).toHaveTextContent('일하기');
  expect(container).toHaveTextContent('완료');
});

import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('받은 값이 없는 경우 테스트', () => {
  const tasks = '';
  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('받은 값이 있는 경우 테스트', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  },
  {
    id: 2,
    title: '이렇게 잘되네',
  }];
  const { container } = render((
    <List
      tasks={tasks}
    />
  ));
  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('이렇게 잘되네');
});

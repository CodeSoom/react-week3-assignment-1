import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    {
      id: 1,
      title: '테스트 코드 작성',
    },
  ];

  const handleClick = jest.fn();

  const { container } = render((
    <List tasks={tasks} onClickDelete={handleClick}></List>
  ));

  expect(container).toHaveTextContent('테스트 코드 작성');
});

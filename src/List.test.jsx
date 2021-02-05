import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

const handleClick = jest.fn();

test('Without task', () => {
  const { container } = render((
    <List tasks={[]} onClickDelete={handleClick} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('With task', () => {
  const tasks = [
    {
      id: 1,
      title: '코드숨 과제하기',
    },
  ];

  const { container } = render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));

  expect(container).toHaveTextContent('코드숨 과제하기');
});

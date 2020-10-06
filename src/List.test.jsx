import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');

  tasks.push({ id: 1, title: '뭐라도 하기' });

  expect(container).toHaveTextContent('뭐라도 하기');

  tasks.push({ id: 2, title: '코드숨 과제하기' });

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('코드숨 과제하기');

  expect(handleClick).not.toBeCalled();
});

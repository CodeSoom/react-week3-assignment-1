import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('ZeroTask', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('MoreThanOneTask', () => {
  const tasks = [
    {
      id: 1,
      title: 'do something',
    },
  ];

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));
  expect(container).toHaveTextContent('do something');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalledWith();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});

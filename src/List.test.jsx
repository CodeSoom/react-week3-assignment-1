import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

const onClickDelete = jest.fn();

const renderTemplate = (tasks = []) => render((
  <List tasks={tasks} onClickDelete={onClickDelete} />
));

test('Empty List', () => {
  const { container } = renderTemplate();

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List with tasks', () => {
  const tasks = [
    { id: 1, title: '어서와 TDD는 처음이지?' },
    { id: 2, title: '아직 시작도 안했어 ^^' },
  ];

  const { container } = renderTemplate(tasks);

  expect(container).toHaveTextContent('어서와 TDD는 처음이지?');
  expect(container).toHaveTextContent('아직 시작도 안했어 ^^');
});

test('List with 완료 buttons', () => {
  const tasks = [
    { id: 1, title: '어서와 TDD는 처음이지?' },
    { id: 2, title: '아직 시작도 안했어 ^^' },
  ];

  const { container, getAllByText } = renderTemplate(tasks);

  const completeButtonLength = getAllByText('완료').length;

  expect(completeButtonLength).toBe(tasks.length);
});

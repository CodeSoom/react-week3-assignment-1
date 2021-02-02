import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

const onClickDelete = jest.fn();

const tasks = [
  { id: 1, title: '어서와 TDD는 처음이지?' },
  { id: 2, title: '아직 시작도 안했어 ^^' },
];

const renderListTemplate = (items = []) => render((
  <List tasks={items} onClickDelete={onClickDelete} />
));

test('Empty List', () => {
  const { container } = renderListTemplate();

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List with tasks', () => {
  const { container } = renderListTemplate(tasks);

  tasks.forEach(({ title }) => {
    expect(container).toHaveTextContent(title);
  });
});

test('List with 완료 buttons', () => {
  const { getAllByText } = renderListTemplate(tasks);

  const completeButtonLength = getAllByText('완료').length;

  expect(completeButtonLength).toBe(tasks.length);
});

test('Buttons with event', () => {
  const { getAllByText } = renderListTemplate(tasks);

  const completeButton = getAllByText('완료');

  completeButton.forEach((button) => {
    fireEvent.click(button);
  });

  expect(onClickDelete).toBeCalledWith(tasks.length);
});

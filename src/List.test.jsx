import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

test('emptyList', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요');

});

test('List', () => {
  const tasks = [
    {id:1, title:'component'},
    {id:2, title:'list'},
    {id:3, title:'test'},
  ];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('component');
  expect(container).toHaveTextContent('list');
  expect(container).toHaveTextContent('test');

});

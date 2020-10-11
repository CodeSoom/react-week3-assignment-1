import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

import testId from './componentTestID';

describe('Page', () => {
  const tasks = [
    { id: 101, title: '할일 1' },
    { id: 102, title: '할일 2' },
  ];
  const handleChange = jest.fn();
  const handleAddClick = jest.fn();
  const handleDeleteClick = jest.fn();

  const { container, getByTestId } = render((
    <Page
      taskTitle="할일"
      tasks={tasks}
      onChangeTitle={handleChange}
      onClickAddTask={handleAddClick}
      onClickDeleteTask={handleDeleteClick}
    />
  ));

  context('When loaded', () => {
    it('show To-do title', () => {
      expect(container).toHaveTextContent('To-do');
    });

    it('show Input component', () => {
      const input = getByTestId(testId.Input);
      expect(container).toContainElement(input);
    });

    it('show List component', () => {
      const list = getByTestId(testId.List);
      expect(container).toContainElement(list);
    });
  });
});

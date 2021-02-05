import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();
  const renderPage = (value, tasks) => (
    render((
      <Page
        taskTitle={value}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAdd}
        tasks={tasks}
        onClickDeleteTask={handleClickDelete}
      />
    ))
  );
  const tasks = [
    { id: 1, title: '앙' },
    { id: 2, title: '기모' },
  ];
  const value = '';

  context('When task is not changed', () => {
    it('Not changed tasks are showed', () => {
      const { container } = renderPage(value, tasks);

      tasks.forEach((task) => (
        expect(container).toHaveTextContent(task.title)
      ));
    });
  });

  context('When task is added', () => {
    const newTask = { id: 3, title: '찌' };
    it('Added tasks showed', () => {
      const { container } = renderPage(value, [...tasks, newTask]);

      [...tasks, newTask].forEach((task) => (
        expect(container).toHaveTextContent(task.title)
      ));
    });
  });

  context('When task is deleted', () => {
    it('Deleted tasks showed', () => {
      const { container } = renderPage(value, tasks.filter((task) => task.id !== 1));

      expect(container).toHaveTextContent('기모');
    });

    it('Value do not changed', () => {
      const newValue = '바뀌지 않아요';
      const { getByLabelText } = renderPage(newValue, tasks);

      expect(getByLabelText('할 일').value).toEqual('바뀌지 않아요');
    });
  });
});

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

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

  it('to-do in "tasks" showed', () => {
    const { container } = renderPage(value, tasks);

    tasks.forEach((task) => (
      expect(container).toHaveTextContent(task.title)
    ));
  });

  it('added tasks', () => {
    const newTask = { id: 3, title: '찌' };
    const { container } = renderPage(value, [...tasks, newTask]);

    [...tasks, newTask].forEach((task) => (
      expect(container).toHaveTextContent(task.title)
    ));
  });

  it('deleted tasks', () => {
    const { getAllByText } = renderPage(value, tasks);

    fireEvent.click(getAllByText('완료')[0]);
    expect(handleClickDelete).toBeCalledWith(1);
  });

  it('when task is deleted value do not changed', () => {
    const newValue = '바뀌지 않아요';
    const { getByLabelText } = renderPage(newValue, tasks);

    expect(getByLabelText('할 일').value).toBe('바뀌지 않아요');
  });
});

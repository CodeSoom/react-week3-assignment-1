import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Tasks from './__fixtures__/tasks.json';
import App from './App';


describe('<App />', () => {
  const renderComponent = () => render((
    <App />
  ));

  it('display empty tasks', () => {
    const { container } = renderComponent();
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('input task', () => {
    const { getByRole } = renderComponent();

    const taskInput = getByRole('textbox');
    Tasks.forEach((task) => {
      fireEvent.change(taskInput, { target: { value: task.title } });
      expect(taskInput.value).toBe(task.title);
    });
  });

  it('add task', () => {
    const { getByRole, getAllByRole } = renderComponent();

    const taskInput = getByRole('textbox');
    Tasks.forEach((task) => {
      fireEvent.change(taskInput, { target: { value: task.title } });
      expect(taskInput.value).toBe(task.title);
      const addTaskButton = getByRole('button', { name: '추가' });
      fireEvent.click(addTaskButton);
      expect(taskInput.value).toBe('');
    });

    const confirmButtons = getAllByRole('button', { name: '완료' });
    expect(confirmButtons.length).toBe(Tasks.length);
  });

  it('confirm added task', () => {
    const { container, getByRole, getAllByRole } = renderComponent();

    const taskInput = getByRole('textbox');
    Tasks.forEach((task) => {
      fireEvent.change(taskInput, { target: { value: task.title } });
      expect(taskInput.value).toBe(task.title);
      const addTaskButton = getByRole('button', { name: '추가' });
      fireEvent.click(addTaskButton);
      expect(taskInput.value).toBe('');
    });

    const confirmButtons = getAllByRole('button', { name: '완료' });
    confirmButtons.forEach((button) => fireEvent.click(button));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

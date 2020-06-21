import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Tasks from './__fixtures__/tasks.json';
import Page from './Page';


describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const tasks = Tasks;

  const renderComponent = () => render((
    <Page
      taskTitle=""
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  context('render', () => {
    it('display tasks list', () => {
      const { container } = renderComponent();
      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });
  });

  context('input box', () => {
    it('fire change event', () => {
      const { getByRole } = renderComponent();
      const taskInput = getByRole('textbox');
      expect(handleChangeTitle).not.toBeCalled();
      fireEvent.change(taskInput, { target: { value: '뭐라도 하기' } });
      expect(handleChangeTitle).toBeCalled();
    });
  });

  context('task add button', () => {
    it('fire click event', () => {
      const { getByRole } = renderComponent();
      const addTaskButton = getByRole('button', { name: '추가' });
      expect(handleClickAddTask).not.toBeCalled();
      fireEvent.click(addTaskButton);
      expect(handleClickAddTask).toBeCalled();
    });
  });

  context('task confirm buttons', () => {
    it('fire click event', () => {
      const { getAllByRole } = renderComponent();
      const confirmButtons = getAllByRole('button', { name: '완료' });
      expect(handleClickDeleteTask).not.toBeCalled();
      confirmButtons.forEach((button) => fireEvent.click(button));
      expect(handleClickDeleteTask).toBeCalledTimes(tasks.length);
    });
  });
});

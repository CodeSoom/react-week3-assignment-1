import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Tasks from './__fixtures__/tasks.json';
import List from './List';


describe('<List />', () => {
  const handleClickDeleteTask = jest.fn();

  const renderComponent = (tasks) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDeleteTask}
    />
  ));

  context('empty list', () => {
    it('display empty list', () => {
      const { container } = renderComponent([]);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('fully list', () => {
    it('display list', () => {
      const { container } = renderComponent(Tasks);
      Tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    it('click event each list items buttons', () => {
      const { getAllByRole } = renderComponent(Tasks);
      const confirmButtons = getAllByRole('button');

      expect(handleClickDeleteTask).not.toBeCalled();

      confirmButtons.forEach((button) => fireEvent.click(button));

      expect(handleClickDeleteTask).toBeCalledTimes(Tasks.length);
    });
  });
});

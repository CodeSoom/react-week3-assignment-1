import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const isEmptyTaskNotice = '할 일이 없어요!';
  const deleteButtonText = '완료';

  const onClickDeleteTask = jest.fn();

  const init = (tasks = []) => render((
    <List
      tasks={tasks}
      onClickDelete={onClickDeleteTask}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('Empty to-do list', () => {
    it('Notification that nothing to-do item', () => {
      const { container } = init();
      expect(container).toHaveTextContent(isEmptyTaskNotice);
    });
  });

  context('Exist only one to-do item', () => {
    const newTask = { id: 100, title: '뭐라도 하자!' };

    it('No notification that nothing to-do item', () => {
      const { container } = init([newTask]);

      expect(container).not.toHaveTextContent(isEmptyTaskNotice);
    });

    it('Show only one to-do item', () => {
      const { container } = init([newTask]);

      expect(container).toHaveTextContent(newTask.title);
      expect(container).toHaveTextContent(deleteButtonText);
    });

    it('Click button next to to-do title', () => {
      const { getByText } = init([newTask]);

      expect(onClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText(deleteButtonText));

      expect(onClickDeleteTask).toBeCalledTimes(1);
    });
  });

  context('Exist more than one to-do items', () => {
    const taskList = [
      { id: 101, title: 'Make test for Input component!' },
      { id: 102, title: 'Make test for Item component!' },
      { id: 103, title: 'Make test for List component!' },
    ];

    it('No notification that nothing to-do item', () => {
      const { container } = init(taskList);

      expect(container).not.toHaveTextContent(isEmptyTaskNotice);
    });

    it('Show to-do list contains title and button', () => {
      const { getByText, getAllByText } = init(taskList);

      taskList.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });

      const buttonList = getAllByText(deleteButtonText);

      expect(buttonList.length).toBe(taskList.length);
    });

    it('Click all buttons next to to-do title', () => {
      const { getAllByText } = init(taskList);

      const buttonList = getAllByText(deleteButtonText);

      expect(onClickDeleteTask).not.toBeCalled();

      buttonList.forEach((button) => {
        fireEvent.click(button);
      });

      expect(onClickDeleteTask).toBeCalledTimes(taskList.length);
    });
  });
});

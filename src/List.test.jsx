import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('List Component', () => {
  const isEmptyTaskNotice = '할 일이 없어요!';
  const deleteButtonText = '완료';

  const onClickDeleteTask = jest.fn();

  const init = ({
    tasks = [],
    onClickDelete = onClickDeleteTask,
  }) => {
    const utils = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
    return { ...utils };
  };

  context('Empty task', () => {
    it('Notification that nothing todo item', () => {
      const { container } = init({});
      expect(container).toHaveTextContent(isEmptyTaskNotice);
    });
  });

  context('Exist only one task', () => {
    const task = [
      { id: 100, title: '뭐라도 하자!' },
    ];

    it('No notification that nothing todo item', () => {
      const { container } = init({ tasks: task });

      expect(container).not.toHaveTextContent(isEmptyTaskNotice);
    });

    it('Show only one task', () => {
      const { getByText } = init({ tasks: task });

      // Item component
      getByText(task[0].title);
      getByText(deleteButtonText);
    });

    it('Test button for clicking', () => {
      const { getByText } = init({ tasks: task });

      expect(onClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText(deleteButtonText));

      expect(onClickDeleteTask).toBeCalledTimes(1);
    });
  });

  context('Exist more than one tasks', () => {
    const taskList = [
      { id: 101, title: 'Make test for Input component!' },
      { id: 102, title: 'Make test for Item component!' },
      { id: 103, title: 'Make test for List component!' },
    ];

    it('No notification that nothing todo item', () => {
      const { container } = init({ tasks: taskList });

      expect(container).not.toHaveTextContent(isEmptyTaskNotice);
    });

    it('Show tasks contain label and button', () => {
      const { getByText, getAllByText } = init({ tasks: taskList });

      taskList.forEach((task) => {
        getByText(task.title);
      });

      const buttonList = getAllByText(deleteButtonText);

      expect(buttonList.length).toBe(taskList.length);
    });

    it('Test buttons for clicking', () => {
      const { getAllByText } = init({ tasks: taskList });

      const buttonList = getAllByText(deleteButtonText);

      expect(onClickDeleteTask).not.toBeCalled();

      buttonList.forEach((button) => {
        fireEvent.click(button);
      });

      expect(onClickDeleteTask).toBeCalledTimes(taskList.length);
    });
  });
});

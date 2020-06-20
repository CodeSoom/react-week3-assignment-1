import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

function renderPage({
  taskTitle, onChangeTitle, onClickAddTask,
  tasks, onClickDeleteTask,
}) {
  render(<Page
    taskTitle={taskTitle}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    tasks={tasks}
    onClickDeleteTask={onClickDeleteTask}
  />);

  const taskTitleInput = screen.getByLabelText(/할 일/i, { selector: 'input' });
  const addTaskButton = screen.getByRole('button', { name: /추가/i });
  const nothingTaskMessageElement = screen.queryByText(/할 일이 없어요!/i);
  const taskListItems = screen.queryAllByRole('listitem', { name: '' });
  const deleteTaskButtons = screen.queryAllByRole('button', { name: /완료/i });

  return {
    taskTitleInput,
    nothingTaskMessageElement,
    taskListItems,
    deleteTaskButtons,
    changeTitle: (text) => fireEvent.change(taskTitleInput, { target: { value: text } }),
    clickAddTaskButton: () => fireEvent.click(addTaskButton),
    clickDeleteButton: (index) => fireEvent.click(deleteTaskButtons[index]),
  };
}

describe('<Page />', () => {
  context('without input value', () => {
    it('print guide message', () => {
      // given
      const taskTitle = '';
      // when
      const { taskTitleInput } = renderPage({
        taskTitle,
        onChangeTitle: jest.fn(),
        onClickAddTask: jest.fn(),
        tasks: [],
        onClickDeleteTask: jest.fn(),
      });
      // then
      expect(taskTitleInput.placeholder).toBe('할 일을 입력해 주세요');
    });
  });

  context('with input value', () => {
    it('print input value', () => {
      // given
      const taskTitle = '어제보다 열심히 하기';
      // when
      const { taskTitleInput } = renderPage({
        taskTitle,
        onChangeTitle: jest.fn(),
        onClickAddTask: jest.fn(),
        tasks: [],
        onClickDeleteTask: jest.fn(),
      });
      // then
      expect(taskTitleInput.value).toBe(taskTitle);
    });
  });

  context('when clicked add button', () => {
    it('notify that it has been clicked', () => {
      // given
      const handleClickAddTask = jest.fn();
      // when
      const { clickAddTaskButton } = renderPage({
        taskTitle: '오늘 할 일',
        onChangeTitle: jest.fn(),
        onClickAddTask: handleClickAddTask,
        tasks: [],
        onClickDeleteTask: jest.fn(),
      });
      clickAddTaskButton();
      // then
      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('when an input field is entered', () => {
    it('notify that it has been entered', () => {
      // given
      const handleChangetitle = jest.fn();
      // when
      const { changeTitle } = renderPage({
        taskTitle: '오늘 할 일',
        onChangeTitle: handleChangetitle,
        onClickAddTask: jest.fn(),
        tasks: [],
        onClickDeleteTask: jest.fn(),
      });
      changeTitle('내일 할 일');
      // then
      expect(handleChangetitle).toBeCalledTimes(1);
    });
  });

  context('without tasks', () => {
    it('print message that there is nothing task', () => {
      // given
      const tasks = [];
      // when
      const { nothingTaskMessageElement } = renderPage({
        taskTitle: '',
        onChangeTitle: jest.fn(),
        onClickAddTask: jest.fn(),
        tasks,
        onClickDeleteTask: jest.fn(),
      });
      // then
      expect(nothingTaskMessageElement).toBeInTheDocument();
    });

    it('do not print task item', () => {
      // given
      const tasks = [];
      // when
      const { taskListItems } = renderPage({
        taskTitle: '',
        onChangeTitle: jest.fn(),
        onClickAddTask: jest.fn(),
        tasks,
        onClickDeleteTask: jest.fn(),
      });
      // then
      expect(taskListItems).toHaveLength(0);
    });
  });

  context('with tasks', () => {
    it('print the items along with the Done buttons', () => {
      // given
      const taskCount = 10;
      const tasks = [...Array(taskCount)].map((value, index) => ({ id: index + 1, title: `${index} 번째 할 일` }));
      // when
      const { taskListItems, deleteTaskButtons } = renderPage({
        taskTitle: '',
        onChangeTitle: jest.fn(),
        onClickAddTask: jest.fn(),
        tasks,
        onClickDeleteTask: jest.fn(),
      });
      // then
      expect(taskListItems).toHaveLength(taskCount);
      expect(deleteTaskButtons).toHaveLength(taskCount);
    });

    it('can click the Done buttons', () => {
      // given
      const tasks = [...Array(10)].map((value, index) => ({ id: index + 1, title: `${index} 번째 할 일` }));
      const handleClickDeleteTask = jest.fn();
      // when
      const { clickDeleteButton } = renderPage({
        taskTitle: '',
        onChangeTitle: jest.fn(),
        onClickAddTask: jest.fn(),
        tasks,
        onClickDeleteTask: handleClickDeleteTask,
      });
      const clickCount = 3;
      [...Array(clickCount)].forEach((value, index) => clickDeleteButton(index));
      // then
      expect(handleClickDeleteTask).toBeCalledTimes(clickCount);
    });
  });
});

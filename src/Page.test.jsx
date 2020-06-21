import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

const handleChangetitle = jest.fn();
const handleClickAddTask = jest.fn();
const handleClickDeleteTask = jest.fn();

function renderPage({ taskTitle, tasks }) {
  render(<Page
    taskTitle={taskTitle}
    onChangeTitle={handleChangetitle}
    onClickAddTask={handleClickAddTask}
    tasks={tasks}
    onClickDeleteTask={handleClickDeleteTask}
  />);

  return {
    taskTitleInput: screen.getByLabelText(/할 일/i, { selector: 'input' }),
    addTaskButton: screen.getByRole('button', { name: /추가/i }),
    nothingTaskMessageElement: screen.queryByText(/할 일이 없어요!/i),
    taskListItems: screen.queryAllByRole('listitem', { name: '' }),
    deleteTaskButtons: screen.queryAllByRole('button', { name: /완료/i }),
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
        tasks: [],
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
        tasks: [],
      });
      // then
      expect(taskTitleInput.value).toBe(taskTitle);
    });
  });

  context('when clicked add button', () => {
    it('notify that it has been clicked', () => {
      // given
      handleClickAddTask.mockClear();
      // when
      const { addTaskButton } = renderPage({
        taskTitle: '오늘 할 일',
        tasks: [],
      });
      fireEvent.click(addTaskButton);
      // then
      expect(handleClickAddTask).toBeCalledTimes(1);
    });
  });

  context('when an input field is entered', () => {
    it('notify that it has been entered', () => {
      // given
      handleChangetitle.mockClear();
      // when
      const { taskTitleInput } = renderPage({
        taskTitle: '오늘 할 일',
        tasks: [],
      });
      fireEvent.change(taskTitleInput, { target: { value: '내일 할 일' } });
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
        tasks,
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
        tasks,
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
        tasks,
      });
      // then
      expect(taskListItems).toHaveLength(taskCount);
      expect(deleteTaskButtons).toHaveLength(taskCount);
    });

    it('can click the Done buttons', () => {
      // given
      const tasks = [...Array(10)].map((value, index) => ({ id: index + 1, title: `${index} 번째 할 일` }));
      handleClickDeleteTask.mockClear();
      // when
      const { deleteTaskButtons } = renderPage({
        taskTitle: '',
        tasks,
      });
      const clickCount = 3;
      [...Array(clickCount)].forEach((value, index) => fireEvent.click(deleteTaskButtons[index]));
      // then
      expect(handleClickDeleteTask).toBeCalledTimes(clickCount);
    });
  });
});

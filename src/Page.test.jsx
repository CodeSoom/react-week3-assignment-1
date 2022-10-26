import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

test('todo page', () => {
  const tasks = [
    { id: 1, title: '리액트 공부하기' },
    { id: 2, title: '블로그 작성하기' },
  ];
  const taskTitle = '';

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { container, getAllByText } = render((<Page
    tasks={tasks}
    taskTitle={taskTitle}
    onChangeTitle={handleChangeTitle}
    onClickAddTask={handleClickAddTask}
    onClickDeleteTask={handleClickDeleteTask}
  />));

  expect(container).toHaveTextContent('리액트 공부하기');
  expect(container).toHaveTextContent('블로그 작성하기');

  const buttons = getAllByText('완료');

  fireEvent.click(buttons[0]);
});

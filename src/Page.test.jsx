import { screen, render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const tasks = [{
    id: 1,
    title: '열공하기',
  }];
  const newTodo = '쓰고 있는 중..';
  const { container } = render(<Page
    taskTitle={newTodo}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    onClickDeleteTask={onClickDeleteTask}
    tasks={tasks}
  />);

  const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
  expect(input.value).toBe(newTodo);

  expect(container).toHaveTextContent('To-do');
});

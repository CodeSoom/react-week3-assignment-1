import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const taskTitle = '';
  const tasks = []; // 배열이기 때문에 {}함수 X

  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const { container } = render(
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />,
  );
  expect(container).toHaveTextContent('To-do');
});

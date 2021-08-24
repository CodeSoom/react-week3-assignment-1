import { render } from '@testing-library/react';
import Page from './Page';

test('Page', () => {
  const taskTitle = '안녕하세여';
  const tasks = [];
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(container).toHaveTextContent('To-do');
});

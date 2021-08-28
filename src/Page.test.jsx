import { render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
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

  test('header에 "To-Do"가 표시되어야 한다.', () => {
    expect(container).toHaveTextContent('To-do');
  });
});

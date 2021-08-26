import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [];
  const taskTitle = '';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  test('\'To-do\'라는 타이틀이 표시된다.', () => {
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
});
